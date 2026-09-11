import { ConfiguracaoBusca } from "../buscarProdutos";
import { regraPesquisa } from "../regras";

const buscaGenerica: ConfiguracaoBusca = {
  regras: [regraPesquisa],
};

export default buscaGenerica;