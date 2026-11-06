import { ConfiguracaoBusca } from "../main/tipos.js";
import { regraPesquisa, regraSemTermosExcluidos } from "../main/regras.js";

export const buscaArvoreComandoValvulas: ConfiguracaoBusca<string> = {
  regras: [
    regraPesquisa,
    regraSemTermosExcluidos([
      "retentor",
      "chaveta",
      "borracha",
      "parafuso",
      "paraf",
      "regulagem",
      "carcaça",
      "torre",
      "engrenagem",
      "balanceiro",
      "porca",
    ]),
  ],
};
