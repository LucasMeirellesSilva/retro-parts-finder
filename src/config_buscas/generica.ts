import { ConfiguracaoBusca } from "../main/tipos.js";
import { regraPesquisa } from "../main/regras.js";

export const buscaGenerica: ConfiguracaoBusca = {
  regras: [
    regraPesquisa,
  ],
};
