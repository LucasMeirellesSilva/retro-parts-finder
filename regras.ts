import { ContextoBusca, RegraBusca } from "./buscarProdutos";
import normalizarTexto from "./search/normalizarTexto";

function primeiraOcorrencia(texto: string, palavras: string[]) {
  let menor = -1;

  for (const palavra of palavras) {
    const pos = texto.indexOf(palavra);

    if (pos !== -1 && (menor === -1 || pos < menor)) {
      menor = pos;
    }
  }

  return menor;
}

export const regraPesquisa: RegraBusca = ({ titulo, palavrasObrigatorias }) =>
  palavrasObrigatorias.every((palavra) =>
    titulo.includes(normalizarTexto(palavra)),
  );

export const regraPistao: RegraBusca = ({ titulo }) =>
  titulo.includes("pistao");

export const regraSemCamisaOuCilindro: RegraBusca = ({ titulo }) =>
  !["camisa", "cilindro"].some((t) => titulo.includes(t));

export const regraPistaoSemAneis: RegraBusca = ({ titulo }) => {
  const temPalavraAneis = titulo.includes("anel") || titulo.includes("aneis");

  const semAnel = /\b(?:sem|s\/)\s*-?\s*an(?:el|eis|éis)\b/i.test(titulo);

  const ehKit = /\bkits?\b/i.test(titulo);

  return ehKit || (temPalavraAneis && !semAnel);
};

export const regraNaoJogoDeAneis: RegraBusca = ({ titulo }) => {
  const posPistao = titulo.indexOf("pistao");
  const posAnel = primeiraOcorrencia(titulo, ["anel", "aneis"]);

  return !(posPistao === -1 || (posAnel !== -1 && posAnel < posPistao));
};

export function regraSemTermosExcluidos(termos: string[]): RegraBusca {
  return ({ titulo }) => !termos.some((termo) => titulo.includes(termo));
}

export const regraAneis: RegraBusca = ({ titulo }) =>
  titulo.includes("anel") || titulo.includes("aneis");

export const regraNaoIncompleto: RegraBusca = ({ titulo }) =>
  !/\b(?:sem|s\/)\s*\w+/i.test(titulo);

export const regraJogoDeAneis: RegraBusca = ({ titulo }) => {
  const posPistao = titulo.indexOf("pistao");
  const posAnel = primeiraOcorrencia(titulo, ["anel", "aneis"]);

  return posPistao === -1 || (posAnel !== -1 && posAnel < posPistao);
};

export const regraPistaoComAneis: RegraBusca = ({ titulo }) => {
  const ehKit = /\bkits?\b/i.test(titulo);

  return (
    ehKit ||
    titulo.includes("anel") ||
    titulo.includes("aneis")
  );
};