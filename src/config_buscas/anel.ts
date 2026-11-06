import { ConfiguracaoBusca } from "../main/tipos.js";
import { MEDIDAS, criarExtratorMedidas } from "../extratores/medidas.js";
import {
  regraPesquisa,
  regraAneis,
  regraJogoDeAneis,
  regraNaoIncompleto,
  regraSemCamisaOuCilindro,
  regraSemTermosExcluidos,
} from "../main/regras.js";

export const buscaAneis: ConfiguracaoBusca<string> = {
  regras: [
    regraPesquisa,
    regraAneis,
    regraJogoDeAneis,
    regraNaoIncompleto,
    regraSemCamisaOuCilindro,
    regraSemTermosExcluidos([
      "escape",
      "escapamento",
      "oring",
      "o-ring",
      "vedacao",
      "cabecote",
      "filtro",
      "bujao",
      "bomba",
      "elastico",
      "flauta",
      "coletor",
      "admissao",
      "admisao",
      "admiçao",
      "fogo",
      "vacuo",
      "dianteiro",
      "suspensao",
    ]),
  ],
  extrator: criarExtratorMedidas(MEDIDAS.PISTAO_OU_ANEL),
  chaveGrupo: (extracao) => extracao,
};
