import { ConfiguracaoBusca } from "../buscarProdutos";
import { MEDIDAS } from "../medidas";
import {
  regraPesquisa,
  regraPistao,
  regraPistaoComAneis,
  regraNaoIncompleto,
  regraSemCamisaOuCilindro,
  regraNaoJogoDeAneis,
  regraSemTermosExcluidos,
} from "../regras";

const buscaPistaoComAnel: ConfiguracaoBusca = {
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

export default buscaPistaoComAnel;