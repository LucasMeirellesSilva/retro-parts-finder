import { ConfiguracaoBusca } from "../busca/buscarProdutos.js";
import { MEDIDAS } from "../extratores/medidas.js";
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

export const buscaPistao: ConfiguracaoBusca = {
  tipoMedida: MEDIDAS.PISTAO,
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
};

export const buscaPistaoComAnel: ConfiguracaoBusca = {
  tipoMedida: MEDIDAS.PISTAO,
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
};