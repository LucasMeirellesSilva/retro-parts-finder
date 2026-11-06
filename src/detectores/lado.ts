import { Detector } from "../main/tipos.js";
import normalizarTexto from "../util/normalizarTexto.js";

export type Lado = "esquerdo" | "direito";

export const detectarLado: Detector<Lado> = (titulo) => {
  const normalizado = normalizarTexto(titulo);

  if (/\besquerdo\b/.test(normalizado)) {
    return "esquerdo";
  }

  if (/\bdireito\b/.test(normalizado)) {
    return "direito";
  }

  return undefined;
};