import type { Extrator } from "../main/tipos.js";
import {
  detectarIdentificadoresBalancim,
  IdentificadorBalancim,
} from "../detectores/identificadoresBalancim.js";
import { detectarLado, Lado } from "../detectores/lado.js";
import {
  detectarTipoBalancim,
  TipoBalancim,
} from "../detectores/tipoBalancim.js";
import { detectarTipoValvula, TipoValvula } from "../detectores/tipoValvula.js";

export type ExtracaoBalancim = {
  tipo?: TipoBalancim;
  valvula?: TipoValvula;
  identificadores: IdentificadorBalancim[];
  lado?: Lado;
};

export const extrairBalancim: Extrator<ExtracaoBalancim> = (titulo) => {
  const extracao: ExtracaoBalancim = {
    tipo: detectarTipoBalancim(titulo),
    valvula: detectarTipoValvula(titulo),
    identificadores: detectarIdentificadoresBalancim(titulo),
    lado: detectarLado(titulo),
  };
  
  const possuiExtracao =
    extracao.tipo !== undefined ||
    extracao.valvula !== undefined ||
    extracao.identificadores.length > 0 ||
    extracao.lado !== undefined;

  if (!possuiExtracao) {
    return [];
  }

  return [extracao];
};
