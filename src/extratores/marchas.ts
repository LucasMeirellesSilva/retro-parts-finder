export type ConfiguracaoMarcha = {
  termos: string[];
};

export const MARCHAS = {
  PRIMEIRA: {
    termos: ["primeira", "1a", "1ª", "1º", "1°", "1*"],
  },

  SEGUNDA: {
    termos: ["segunda", "2a", "2ª", "2º", "2°", "2*"],
  },

  TERCEIRA: {
    termos: ["terceira", "3a", "3ª", "3º", "3°", "3*"],
  },

  QUARTA: {
    termos: ["quarta", "4a", "4ª", "4º", "4°", "4*"],
  },

  QUINTA: {
    termos: ["quinta", "5a", "5ª", "5º", "5°", "5*"],
  },

  SEXTA: {
    termos: ["sexta", "6a", "6ª", "6º", "6°", "6*"],
  },

  TERCEIRA_QUARTA: {
    termos: ["dupla", "3/4", "3ª/4ª"],
  },
} satisfies Record<string, ConfiguracaoMarcha>;

export type Marcha = keyof typeof MARCHAS;

export type TipoEngrenagemCambio = "motora" | "movida";

export type EngrenagemCambio = {
  marcha: Marcha;
  tipo: TipoEngrenagemCambio;
};

const termosTipoEngrenagem = {
  motora: ["motora", "primaria", "primario"],
  movida: ["movida", "secundaria", "secundario"],
} satisfies Record<TipoEngrenagemCambio, string[]>;

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function escaparRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function contemTermo(texto: string, termo: string): boolean {
  const termoNormalizado = normalizarTexto(termo);

  const regex = new RegExp(
    `(?<!\\w)${escaparRegex(termoNormalizado)}(?!\\w)`,
    "i",
  );

  return regex.test(texto);
}

export function extrairEngrenagensCambio(
  titulo: string,
): EngrenagemCambio[] {
  const tituloNormalizado = normalizarTexto(titulo);

  const engrenagensEncontradas: EngrenagemCambio[] = [];

  let tipo: TipoEngrenagemCambio | null = null;

  if (
    termosTipoEngrenagem.motora.some((termo) =>
      contemTermo(tituloNormalizado, termo),
    )
  ) {
    tipo = "motora";
  } else if (
    termosTipoEngrenagem.movida.some((termo) =>
      contemTermo(tituloNormalizado, termo),
    )
  ) {
    tipo = "movida";
  }

  if (!tipo) {
    return engrenagensEncontradas;
  }

  for (const marcha of Object.keys(MARCHAS) as Marcha[]) {
    const encontrouMarcha = MARCHAS[marcha].termos.some((termo) =>
      contemTermo(tituloNormalizado, termo),
    );

    if (!encontrouMarcha) {
      continue;
    }

    engrenagensEncontradas.push({
      marcha,
      tipo,
    });
  }

  return engrenagensEncontradas;
}