import { ConfiguracaoBusca } from "../buscarProdutos";
import { MEDIDAS } from "../medidas";
import {
  regraPesquisa,
  regraPistao,
  regraPistaoSemAneis,
  regraSemCamisaOuCilindro,
  regraNaoJogoDeAneis,
  regraSemTermosExcluidos,
} from "../regras";

const buscaPistao: ConfiguracaoBusca = {
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

export default buscaPistao;