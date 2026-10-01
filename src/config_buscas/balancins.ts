import { ConfiguracaoBusca } from "../busca/tipos.js";
import { regraPesquisa, regraPossuiIdentificadorBalancim, regraPossuiTipoValvula, regraSemTermosExcluidos } from "../busca/regras.js";
import { ExtracaoBalancim, extrairBalancim } from "../extratores/balancins.js";

const termosExcluidosBalancim = [
    "eixo"
]

export const buscaBalamcimA : ConfiguracaoBusca<ExtracaoBalancim> = {
    regras: [
        regraPesquisa,
        regraSemTermosExcluidos(termosExcluidosBalancim),
        regraPossuiIdentificadorBalancim("A")
    ],
    extrator: extrairBalancim
}

export const buscaBalamcimB: ConfiguracaoBusca<ExtracaoBalancim> = {
    regras: [
        regraPesquisa,
        regraSemTermosExcluidos(termosExcluidosBalancim),
        regraPossuiIdentificadorBalancim("B")
    ],
    extrator: extrairBalancim
}

export const buscaBalamcimC : ConfiguracaoBusca<ExtracaoBalancim> = {
    regras: [
        regraPesquisa,
        regraSemTermosExcluidos(termosExcluidosBalancim),
        regraPossuiIdentificadorBalancim("C")
    ],
    extrator: extrairBalancim
}

export const buscaBalancimAdmissao : ConfiguracaoBusca<ExtracaoBalancim> = {
    regras: [
        regraPesquisa,
        regraSemTermosExcluidos(termosExcluidosBalancim),
        regraPossuiTipoValvula("admissao")
    ],
    extrator: extrairBalancim
}

export const buscaBalancimEscape : ConfiguracaoBusca<ExtracaoBalancim> = {
    regras: [
        regraPesquisa,
        regraSemTermosExcluidos(termosExcluidosBalancim),
        regraPossuiTipoValvula("escape")
    ],
    extrator: extrairBalancim
}
