import { ConfiguracaoBusca } from "../buscarProdutos.js";
import { regraPesquisa, regraSemTermosExcluidos } from "../regras.js";
import { MARCHAS, Marcha } from "../marchas.js";

const termosExcluidosEngCambio = [
  "partida",
  "pedal",
  "chaveta",
  "arruela",
  "corrente",
  "trator",
  "M8",
  "M9",
  "bomba",
  "oleo",
  "rolamento",
  "gaiola",
  "ford",
  "deslizante",
  "volare",
  "cargo",
  "4000",
  "4100",
  "4200",
  "4300",
];

const termosExcluidosPorTipo = {
  motora: ["movida", "secundaria", "secundario", "pinhao"],

  movida: ["motora", "primaria", "primario"],
};

interface ConfiguracaoBuscaEngrenagemCambio {
  marcha: Marcha;
  tipo: "motora" | "movida";
}

function blacklistMarchasExceto(...marchasPermitidas: Marcha[]) {
  const todosOsTermos = Object.values(MARCHAS).flatMap(
    (marcha) => marcha.termos,
  );

  const termosPermitidos = marchasPermitidas.flatMap(
    (marcha) => MARCHAS[marcha].termos,
  );

  return todosOsTermos.filter((termo) => !termosPermitidos.includes(termo));
}

function criarBuscaEngrenagemCambio({
  marcha,
  tipo,
}: ConfiguracaoBuscaEngrenagemCambio): ConfiguracaoBusca {
  return {
    regras: [
      regraPesquisa,
      regraSemTermosExcluidos([
        ...blacklistMarchasExceto(marcha),
        ...termosExcluidosEngCambio,
        ...termosExcluidosPorTipo[tipo],
      ]),
    ],
  };
}

export const buscaEngrenagem1AMotora = criarBuscaEngrenagemCambio({
  marcha: "PRIMEIRA",
  tipo: "motora",
});

export const buscaEngrenagem1AMovida = criarBuscaEngrenagemCambio({
  marcha: "PRIMEIRA",
  tipo: "movida",
});

export const buscaEngrenagem2AMotora = criarBuscaEngrenagemCambio({
  marcha: "SEGUNDA",
  tipo: "motora",
});

export const buscaEngrenagem2AMovida = criarBuscaEngrenagemCambio({
  marcha: "SEGUNDA",
  tipo: "movida",
});

export const buscaEngrenagem3AMotora = criarBuscaEngrenagemCambio({
  marcha: "TERCEIRA",
  tipo: "motora",
});

export const buscaEngrenagem3AMovida = criarBuscaEngrenagemCambio({
  marcha: "TERCEIRA",
  tipo: "movida",
});

export const buscaEngrenagem4AMotora = criarBuscaEngrenagemCambio({
  marcha: "QUARTA",
  tipo: "motora",
});

export const buscaEngrenagem4AMovida = criarBuscaEngrenagemCambio({
  marcha: "QUARTA",
  tipo: "movida",
});

export const buscaEngrenagem3A4AMotora = criarBuscaEngrenagemCambio({
  marcha: "TERCEIRA_QUARTA",
  tipo: "motora",
});

export const buscaEngrenagem3A4AMovida = criarBuscaEngrenagemCambio({
  marcha: "TERCEIRA_QUARTA",
  tipo: "movida",
});

export const buscaEngrenagem5AMotora = criarBuscaEngrenagemCambio({
  marcha: "QUINTA",
  tipo: "motora",
});

export const buscaEngrenagem5AMovida = criarBuscaEngrenagemCambio({
  marcha: "QUINTA",
  tipo: "movida",
});

export const buscaEngrenagem6AMotora = criarBuscaEngrenagemCambio({
  marcha: "SEXTA",
  tipo: "motora",
});

export const buscaEngrenagem6AMovida = criarBuscaEngrenagemCambio({
  marcha: "SEXTA",
  tipo: "movida",
});
