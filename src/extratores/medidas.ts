export type ConfiguracaoMedidas = {
  inicial: number;
  final: number;
  passo: number;
};

export const MEDIDAS = {
  PISTAO: {
    inicial: 0.25,
    final: 2.0,
    passo: 0.25,
  },

  ANEL: {
    inicial: 0.25,
    final: 2.0,
    passo: 0.25,
  },

  BRONZINA: {
    inicial: 0.25,
    final: 1.0,
    passo: 0.25,
  },
} satisfies Record<string, ConfiguracaoMedidas>;

export function medidaParaCodigo(medida: number): string {
  return Math.round(medida * 100)
    .toString()
    .padStart(3, "0");
}

export function codigoParaMedida(codigo: string): string {
  if (codigo === "STD") {
    return "STD";
  }

  const numero = Number(codigo) / 100;

  return numero.toFixed(2);
}

export function formatarMedida(codigo: string): string {
  if (codigo === "STD") {
    return "STD";
  }

  if (codigo === "null") {
    return "Medida Não Encontrada";
  }

  codigo = codigo.padStart(3, "0");

  return `${codigo[0]},${codigo.slice(1)}`;
}

export function gerarMedidas(config: ConfiguracaoMedidas): number[] {
  const medidas: number[] = [];

  for (
    let medida = config.inicial;
    medida <= config.final + Number.EPSILON;
    medida += config.passo
  ) {
    medidas.push(Number(medida.toFixed(2)));
  }

  return medidas;
}

export function extrairMedidas(
  titulo: string,
  config: ConfiguracaoMedidas,
): string[] {
  const tituloNormalizado = titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const medidasEncontradas: string[] = [];

  // STD -> palavras começando com "Stand" são consideradas Standart (STD)
  if (/\b(?:std|stand\w*)\b/i.test(tituloNormalizado)) {
    medidasEncontradas.push("STD");
  }

  const medidasPossiveis = gerarMedidas(config);

  for (const medida of medidasPossiveis) {
    const codigo = Math.round(medida * 100)
      .toString()
      .padStart(3, "0");

    let regex: RegExp;

    // Ex:
    // 1.00 -> aceita 1,0 / 1.00 / 1,00 / 1.0
    if (Number.isInteger(medida)) {
      const inteiro = medida.toString();

      regex = new RegExp(
        `\\b${inteiro}(?:[,.]0{1,2})?(?:\\s*mm)?\\b`,
        "i",
      );
    } else {
      // Ex:
      // 0.25 -> aceita 0,25 e 0.25
      const decimal = medida.toFixed(2);

      regex = new RegExp(
        `\\b${decimal.replace(".", "[,.]")}(?:\\s*mm)?\\b`,
        "i",
      );
    }

    if (regex.test(tituloNormalizado)) {
      medidasEncontradas.push(codigo);
    }
  }

  return medidasEncontradas;
}