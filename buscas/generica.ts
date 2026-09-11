import { ConfiguracaoBusca } from "../buscarProdutos";
import { regraPesquisa, regraSemTermosExcluidos } from "../regras";

const buscaGenerica: ConfiguracaoBusca = {
  regras: [
    regraPesquisa,
    // regraSemTermosExcluidos(["mola", "retentor", "chaveta"]),
  ],
};

export default buscaGenerica;
