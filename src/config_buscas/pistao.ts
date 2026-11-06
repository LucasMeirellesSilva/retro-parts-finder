import { ConfiguracaoBusca } from "../main/tipos.js";
import { MEDIDAS, criarExtratorMedidas } from "../extratores/medidas.js";
import {
  regraPesquisa,
  regraPistao,
  regraPistaoSemAneis,
  regraSemCamisaOuCilindro,
  regraNaoJogoDeAneis,
  regraSemTermosExcluidos,
  regraPistaoComAneis,
  regraNaoIncompleto,
} from "../main/regras.js";

export const buscaPistao: ConfiguracaoBusca<string> = {
  regras: [
    regraPesquisa,
    regraPistao,
    regraPistaoSemAneis,
    regraSemCamisaOuCilindro,
    regraNaoJogoDeAneis,
    regraSemTermosExcluidos([
      "junta",
      "juntas",
      "biela",
    ]),
  ],
  extrator: criarExtratorMedidas(MEDIDAS.PISTAO_OU_ANEL),
  chaveGrupo: (extracao) => extracao,
};

export const buscaPistaoComAnel: ConfiguracaoBusca<string> = {
  regras: [
    regraPesquisa,
    regraPistao,
    regraPistaoComAneis,
    regraNaoIncompleto,
    regraSemCamisaOuCilindro,
    regraNaoJogoDeAneis,
    regraSemTermosExcluidos([
      "junta",
      "juntas",
      "biela",
    ]),
  ],
  extrator: criarExtratorMedidas(MEDIDAS.PISTAO_OU_ANEL),
  chaveGrupo: (extracao) => extracao,
};