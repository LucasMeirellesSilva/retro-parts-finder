import { ConfiguracaoBusca } from "../main/tipos.js";
import { regraPesquisa, regraSemTermosExcluidos, regraEngrenagem } from "../main/regras.js";
import { EngrenagemCambio, MARCHAS, Marcha, extrairEngrenagensCambio } from "../extratores/marchas.js";

const termosExcluidosEngCambio = [
  "partida",
  "pedal",
  "chaveta",
  "mola",
  "alavanca",
  "tacometro",
  "arruela",
  "retentor",
  "trava",
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
  marchas: Marcha[];
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
  marchas,
  tipo,
}: ConfiguracaoBuscaEngrenagemCambio): ConfiguracaoBusca {
  return {
    regras: [
      regraPesquisa,
      regraEngrenagem,
      regraSemTermosExcluidos([
        ...blacklistMarchasExceto(...marchas),
        ...termosExcluidosEngCambio,
        ...termosExcluidosPorTipo[tipo],
      ]),
    ],
  };
}

export const buscaEngrenagem1AMotora = criarBuscaEngrenagemCambio({
  marchas: ["PRIMEIRA"],
  tipo: "motora",
});

export const buscaEngrenagem1AMovida = criarBuscaEngrenagemCambio({
  marchas: ["PRIMEIRA"],
  tipo: "movida",
});

export const buscaEngrenagem2AMotora = criarBuscaEngrenagemCambio({
  marchas: ["SEGUNDA"],
  tipo: "motora",
});

export const buscaEngrenagem2AMovida = criarBuscaEngrenagemCambio({
  marchas: ["SEGUNDA"],
  tipo: "movida",
});

export const buscaEngrenagem3AMotora = criarBuscaEngrenagemCambio({
  marchas: ["TERCEIRA"],
  tipo: "motora",
});

export const buscaEngrenagem3AMovida = criarBuscaEngrenagemCambio({
  marchas: ["TERCEIRA"],
  tipo: "movida",
});

export const buscaEngrenagem4AMotora = criarBuscaEngrenagemCambio({
  marchas: ["QUARTA"],
  tipo: "motora",
});

export const buscaEngrenagem4AMovida = criarBuscaEngrenagemCambio({
  marchas: ["QUARTA"],
  tipo: "movida",
});

export const buscaEngrenagem3A4AMotora = criarBuscaEngrenagemCambio({
  marchas: ["TERCEIRA_QUARTA", "TERCEIRA", "QUARTA"],
  tipo: "motora",
});

export const buscaEngrenagem3A4AMovida = criarBuscaEngrenagemCambio({
  marchas: ["TERCEIRA_QUARTA", "TERCEIRA", "QUARTA"],
  tipo: "movida",
});

export const buscaEngrenagem5AMotora = criarBuscaEngrenagemCambio({
  marchas: ["QUINTA"],
  tipo: "motora",
});

export const buscaEngrenagem5AMovida = criarBuscaEngrenagemCambio({
  marchas: ["QUINTA"],
  tipo: "movida",
});

export const buscaEngrenagem6AMotora = criarBuscaEngrenagemCambio({
  marchas: ["SEXTA"],
  tipo: "motora",
});

export const buscaEngrenagem6AMovida = criarBuscaEngrenagemCambio({
  marchas: ["SEXTA"],
  tipo: "movida",
});

export const buscaEngrenagensCambio: ConfiguracaoBusca<EngrenagemCambio> = {
  regras: [
    regraPesquisa,
    regraEngrenagem,
    regraSemTermosExcluidos(
      termosExcluidosEngCambio,
    ),
  ],

  extrator: extrairEngrenagensCambio,

  chaveGrupo: (engrenagem) =>
    `${engrenagem.marcha}_${engrenagem.tipo}`,
};