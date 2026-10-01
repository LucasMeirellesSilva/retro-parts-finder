import { DetectorMultiplos } from "../busca/tipos.js";
import normalizarTexto from "../util/normalizarTexto.js";

export type IdentificadorBalancim = "A" | "B" | "C";

export const detectarIdentificadoresBalancim: DetectorMultiplos<
  IdentificadorBalancim
> = (titulo) => {
  const normalizado = normalizarTexto(titulo);

  const encontrados = new Set<IdentificadorBalancim>();

  const regex = /\b([abc])\b/gi;

  for (const match of normalizado.matchAll(regex)) {
    encontrados.add(
      match[1].toUpperCase() as IdentificadorBalancim,
    );
  }

  return [...encontrados];
};
