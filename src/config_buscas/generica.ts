import { ConfiguracaoBusca } from "../busca/tipos.js";
import { regraPesquisa } from "../busca/regras.js";

const buscaGenerica: ConfiguracaoBusca = {
  regras: [
    regraPesquisa,
  ],
};

export default buscaGenerica;
