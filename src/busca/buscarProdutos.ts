import {
  Produto,
  ConfiguracaoBusca,
  ResultadoExtracao,
  ContextoBusca,
} from "./tipos.js";

import normalizarTexto from "../util/normalizarTexto.js";

export default function buscarProdutos<T>(
  produtos: Produto[],
  termosObrigatorios: string[],
  config: ConfiguracaoBusca<T>,
) {
  const filtrados = produtos.filter((produto) => {
    const ctx: ContextoBusca = {
      produto,
      titulo: normalizarTexto(produto.titulo),
      termosObrigatorios,
    };

    return config.regras.every((regra) => regra(ctx));
  });

  let resultadosExtracao: ResultadoExtracao<T>[] | undefined;

  if (config.extrator) {
    const extrator = config.extrator;

    resultadosExtracao = filtrados.map((produto) => ({
      produto,
      extracoes: extrator(produto.titulo),
    }));
  }

  let grupos: Record<string, Produto[]> | undefined;

  if (config.extrator && config.chaveGrupo) {
    const extrator = config.extrator;
    const chaveGrupo = config.chaveGrupo;

    grupos = {};

    for (const produto of filtrados) {
      const extracoes = extrator(produto.titulo);

      const gruposDoProduto = new Set(
        extracoes.map(chaveGrupo),
      );

      for (const grupo of gruposDoProduto) {
        grupos[grupo] ??= [];
        grupos[grupo].push(produto);
      }
    }
  }

  return {
    filtrados,
    resultadosExtracao,
    grupos,
  };
}