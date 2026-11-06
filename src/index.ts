import { chromium } from "playwright";

import gerarUrl from "./main/gerarUrl.js";
import encontrarProdutos from "./main/encontrarProdutos.js";
import { ArgumentosPesquisa, Produto } from "./main/tipos.js";
import { buscaArvoreComandoValvulas } from "./config_buscas/arvoreComandoValvulas.js";


const pesquisaInput = "Arvore Comando Turuna Xls";
const grupoInput = "";


const context = await chromium.launchPersistentContext("./scraping-ml", {
  headless: false,
});

await context.addInitScript(() => {
  Object.defineProperty(Navigator.prototype, "webdriver", {
    get() {
      return false;
    },
    configurable: true,
  });
});

const page = context.pages()[0] ?? (await context.newPage());

async function testar({
  page,
  pesquisa,
  paginaAtual = 1,
  grupo,
  resultados = {
    filtrados: [],
    grupos: {},
  },
}: ArgumentosPesquisa): Promise<void> {
  const url = gerarUrl({
    pesquisa,
    pagina: paginaAtual,
  });

  console.log("Abrindo:", url);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });

  await page.waitForFunction(() => {
    return (
      document.querySelector(".ui-search-rescue") ||
      document.querySelectorAll(".poly-card__content").length > 0
    );
  });

  if (await page.locator(".ui-search-rescue").isVisible()) {
    console.log(
      "Nenhum resultado encontrado para página " + paginaAtual,
    );
  }

  const produtos: Produto[] = await page
    .locator(".poly-card__content")
    .evaluateAll((cards) =>
      cards.map((card) => {
        const tituloEl = card.querySelector(
          "a.poly-component__title",
        ) as HTMLAnchorElement | null;

        const precoEl = card.querySelector(
          ".andes-money-amount__fraction",
        );

        return {
          titulo: tituloEl?.textContent?.trim() ?? "",
          preco: precoEl?.textContent?.trim() ?? "",
          link: tituloEl?.href ?? "",
        };
      }),
    );

  const termosObrigatorios = ["turuna"];

  const resultadoAtual = encontrarProdutos(
    produtos,
    termosObrigatorios,
    buscaArvoreComandoValvulas,
  );

  const gruposAcumulados = {
    ...resultados.grupos,
  };

  for (const [nomeGrupo, produtosGrupo] of Object.entries(
    resultadoAtual.grupos ?? {},
  )) {
    gruposAcumulados[nomeGrupo] = [
      ...(gruposAcumulados[nomeGrupo] ?? []),
      ...produtosGrupo,
    ];
  }

  resultados = {
    filtrados: [
      ...resultados.filtrados,
      ...resultadoAtual.filtrados,
    ],
    grupos: gruposAcumulados,
  };

  const totalResultados = grupo
    ? (resultados.grupos[grupo]?.length ?? 0)
    : resultados.filtrados.length;

  const minimoResultados = grupo ? 3 : 10;

  if (totalResultados < minimoResultados && paginaAtual < 3) {
    return testar({
      page,
      pesquisa,
      paginaAtual: paginaAtual + 1,
      grupo,
      resultados,
    });
  }

  console.log(
    "\nTotal encontrados:",
    resultados.filtrados.length,
  );

  if (Object.keys(resultados.grupos).length > 0) {
    console.log("\nResultados agrupados:\n");

    for (const [nomeGrupo, produtosGrupo] of Object.entries(
      resultados.grupos,
    )) {
      if (grupo && nomeGrupo !== grupo) {
        continue;
      }

      console.log("\n====================");
      console.log(`GRUPO: ${nomeGrupo}`);
      console.log(`TOTAL: ${produtosGrupo.length}`);
      console.log("====================");

      produtosGrupo.forEach((produto, index) => {
        console.log(`\n#${index + 1}`);
        console.log("Título:", produto.titulo);
        console.log("Preço: R$", produto.preco);
        // console.log("Link:", produto.link);
      });
    }
  } else {
    console.log("\nResultados:\n");

    resultados.filtrados.forEach((produto, index) => {
      console.log(`\n#${index + 1}`);
      console.log("Título:", produto.titulo);
      console.log("Preço: R$", produto.preco);
      // console.log("Link:", produto.link);
    });
  }

  console.log("\nPressione ENTER para fechar...");

  process.stdin.resume();

  process.stdin.once("data", async () => {
    await context.close();
    process.exit(0);
  });
}

testar({
  page,
  pesquisa: pesquisaInput,
  paginaAtual: 1,
  grupo: grupoInput || undefined,
}).catch(console.error);