import { ConfiguracaoBusca } from "../buscarProdutos.js";
import { regraPesquisa } from "../regras.js";

const buscaGenerica: ConfiguracaoBusca = {
  regras: [
    regraPesquisa,
  ],
};

export default buscaGenerica;
