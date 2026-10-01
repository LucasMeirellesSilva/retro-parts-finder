import { Detector } from "../busca/tipos.js";
import normalizarTexto from "../util/normalizarTexto.js";

export type TipoValvula = "admissao" | "escape";

export const detectarTipoValvula: Detector<TipoValvula> = (titulo) => {
  const tituloNormalizado = normalizarTexto(titulo);

  if (
    /\badmissao\b/.test(tituloNormalizado) ||
    /\badm\b/.test(tituloNormalizado)
  ) {
    return "admissao";
  }

  if (
    /\bescape\b/.test(tituloNormalizado) ||
    /\besc\b/.test(tituloNormalizado)
  ) {
    return "escape";
  }

  return undefined;
};