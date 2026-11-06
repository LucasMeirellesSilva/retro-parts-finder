import { Detector } from "../main/tipos.js";
import normalizarTexto from "../util/normalizarTexto.js";

export type TipoBalancim = "primario" | "secundario";

export const detectarTipoBalancim: Detector<TipoBalancim> = (titulo) => {
  const normalizado = normalizarTexto(titulo);

  if (/\bsecundari[oa]\b/.test(normalizado)) {
    return "secundario";
  }

  if (/\bprimari[oa]\b/.test(normalizado)) {
    return "primario";
  }

  return undefined;
};