import { Produto } from ".";
import normalizarTexto from "./util/normalizarTexto";
import { ConfiguracaoMedidas, extrairMedidas } from "./medidas";

export interface ContextoBusca {
  produto: Produto;
  titulo: string;
  palavrasObrigatorias: string[];
}

export type RegraBusca = (ctx: ContextoBusca) => boolean;

export interface ConfiguracaoBusca {
  regras: RegraBusca[];
  tipoMedida?: ConfiguracaoMedidas;
}

export default function buscarProdutos(
  produtos: Produto[],
  palavrasObrigatorias: string[],
  config: ConfiguracaoBusca,
) {
  const filtrados = produtos.filter((produto) => {
    const ctx: ContextoBusca = {
      produto,
      titulo: normalizarTexto(produto.titulo),
      palavrasObrigatorias,
    };

    return config.regras.every((regra) => regra(ctx));
  });

  let grupos: Record<string, Produto[]> | undefined;

  if (config.tipoMedida) {
    grupos = {};

    for (const produto of filtrados) {
      const medidas = extrairMedidas(
        produto.titulo,
        config.tipoMedida,
      );

      if (medidas.length === 0) {
        grupos["null"] ??= [];
        grupos["null"].push(produto);
        continue;
      }

      for (const medida of medidas) {
        grupos[medida] ??= [];
        grupos[medida].push(produto);
      }
    }
  }

  return {
    filtrados,
    grupos,
  };
}