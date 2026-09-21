import gerarSlugPesquisa from "./gerarSlugPesquisa.js";

export enum Ordenacao {
  RELEVANCIA = "relevancia",
  MENOR_PRECO = "menor_preco",
  MAIOR_PRECO = "maior_preco",
}

type GerarUrlArgs = {
  pesquisa: string;
  pagina?: number;
  ordenacao?: Ordenacao;
};

export default function gerarUrl({
  pesquisa,
  pagina = 1,
  ordenacao = Ordenacao.MENOR_PRECO,
}: GerarUrlArgs): string {
  const slug = gerarSlugPesquisa(pesquisa);

  let paginaMl = "";

  if (pagina > 1) {
    // 48 Anuncios por Pag
    // Pagina 1 = Sem  Skip, Pagina 2 = 
    const skip = (pagina - 1) * 48;
    paginaMl = `_Desde_${skip + 1}`;
  }

  let ordenacaoMl = "";

  switch (ordenacao) {
    case Ordenacao.MENOR_PRECO:
      ordenacaoMl = "_OrderId_PRICE";
      break;

    case Ordenacao.MAIOR_PRECO:
      ordenacaoMl = "_OrderId_PRICE_DESC";
      break;

    case Ordenacao.RELEVANCIA:
      ordenacaoMl = "";
      break;
  }

  // const marcaMl = `_BRAND_${12084392}`
  const categoriaMl = `acessorios-veiculos/pecas-motos-quadriciclos/transmissao/engrenagens`

  // const categoriaMl = ``
  

  return `https://lista.mercadolivre.com.br/${categoriaMl}${slug}_CustoFrete_Gratis${paginaMl}${ordenacaoMl}_NoIndex_True`;
}