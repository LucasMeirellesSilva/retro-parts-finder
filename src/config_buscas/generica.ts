import { ConfiguracaoBusca } from "../busca/buscarProdutos.js";
import { regraPesquisa } from "../busca/regras.js";

const buscaGenerica: ConfiguracaoBusca = {
  regras: [
    regraPesquisa,
  ],
};

export default buscaGenerica;
