import normalizarTexto from "../util/normalizarTexto.js";
import { Motocicleta } from "./tipos.js";

export type AlternativaPesquisa = {
  pesquisa: string;
  termosObrigatorios: string[];
  termoAlternativo:string | null ;
};

export default function gerarPesquisas(
  motocicletas: Motocicleta[],
  nomePeca: string,
): AlternativaPesquisa[] {
  const alternativas = new Map<string, AlternativaPesquisa>();

  for (const motocicleta of motocicletas) {
    const modelo = motocicleta.modelo.trim();

    if (!modelo) {
      continue;
    }

    const versoes = motocicleta.versoes;

    // Pesquisa pelo modelo principal.
    adicionarAlternativa(modelo, null);

    for (const versao of versoes) {
      const titulo = versao.titulo.trim();
      const apelido = versao.apelido.trim();

      if (apelido) {
        adicionarAlternativa(titulo, apelido);
      } else {
        adicionarAlternativa(titulo, null)
      }
    }

    function adicionarAlternativa(
      nomeModelo: string,
      termoAlternativo: string | null,
    ) {
      const pesquisa = `${nomePeca} ${nomeModelo} ${termoAlternativo ?? ""}`.trim();

      const termosObrigatorios = normalizarTexto(nomeModelo)
        .split(/\s+/)
        .filter(Boolean);

      const chave = normalizarTexto(pesquisa);

      if (!alternativas.has(chave)) {
        alternativas.set(chave, {
          pesquisa,
          termosObrigatorios,
          termoAlternativo: termoAlternativo
            ? normalizarTexto(termoAlternativo)
            : null,
        });
      }
    }
  }

  return [...alternativas.values()];
}