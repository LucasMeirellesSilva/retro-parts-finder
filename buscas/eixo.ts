import { ConfiguracaoBusca } from "../buscarProdutos.js";
import { regraPesquisa, regraSemTermosExcluidos } from "../regras.js";

export const buscaEixoPrimario: ConfiguracaoBusca = {
  regras: [
    regraPesquisa,
    regraSemTermosExcluidos([
      "secundario",
      "pinhao",
      "movida",
      "mola",
      "freio",
      "pedal"
    ]),
  ],
};

export const buscaEixoSecundario: ConfiguracaoBusca = {
  regras: [
    regraPesquisa,
    regraSemTermosExcluidos([
      "primario",
      "mola",
      "freio",
      "pedal"
    ]),
  ],
};

export const buscaEixoPedal: ConfiguracaoBusca = {
  regras: [
    regraPesquisa,
    regraSemTermosExcluidos([
      "primario",
      "secundario",
      "pinhao",
      "mola",
      "cambio",
      "freio",
    ]),
  ],
};

