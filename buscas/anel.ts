import { ConfiguracaoBusca } from "../buscarProdutos";
import { MEDIDAS } from "../medidas";
import {
  regraPesquisa,
  regraAneis,
  regraJogoDeAneis,
  regraNaoIncompleto,
  regraSemCamisaOuCilindro,
  regraSemTermosExcluidos,
} from "../regras";

const buscaAneis: ConfiguracaoBusca = {
  tipoMedida: MEDIDAS.ANEL,
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
};

export default buscaAneis;