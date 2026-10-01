import { ConfiguracaoBusca } from "../busca/tipos.js";
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
} from "../busca/regras.js";

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