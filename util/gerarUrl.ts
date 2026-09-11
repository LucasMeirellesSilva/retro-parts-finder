import gerarSlugPesquisa from "./gerarSlugPesquisa";

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

  // const brandMl = `_BRAND_${mlKmpId}`
  const brandMl = `_category=MLB45560`


  return `https://lista.mercadolivre.com.br/${slug}_CustoFrete_Gratis${brandMl}${paginaMl}${ordenacaoMl}_NoIndex_True`;
}