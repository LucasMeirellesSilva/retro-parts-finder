import { Produto } from ".";
import normalizarTexto from "./search/normalizarTexto";
import { ConfiguracaoMedidas, extrairMedida } from "./medidas";

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
      const medida =
        extrairMedida(produto.titulo, config.tipoMedida) ?? "null";

      grupos[medida] ??= [];
      grupos[medida].push(produto);
    }

    for (const grupo of Object.values(grupos)) {
      grupo.sort((a, b) => {
        const precoA = Number(a.preco.replace(/\D/g, ""));
        const precoB = Number(b.preco.replace(/\D/g, ""));
        return precoA - precoB;
      });
    }
  }

  return {
    filtrados,
    grupos,
  };
}