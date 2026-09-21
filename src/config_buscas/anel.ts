import { ConfiguracaoBusca } from "../busca/buscarProdutos.js";
import { MEDIDAS } from "../extratores/medidas.js";
import {
  regraPesquisa,
  regraAneis,
  regraJogoDeAneis,
  regraNaoIncompleto,
  regraSemCamisaOuCilindro,
  regraSemTermosExcluidos,
} from "../busca/regras.js";

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