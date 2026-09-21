import { chromium, Page } from "playwright";

import gerarUrl from "./util/gerarUrl.js";
import { codigoParaMedida, formatarMedida } from "./extratores/medidas.js";
import buscarProdutos from "./busca/buscarProdutos.js";
import { buscaPistao, buscaPistaoComAnel } from "../config_buscas/pistao.js";
import { buscaEixoPrimario } from "./config_buscas/eixo.js"
import { buscaEngrenagem1AMotora, buscaEngrenagem2AMotora, buscaEngrenagem3A4AMotora } from "./config_buscas/engrenagem.js"
import buscaGenerica from "./config_buscas/generica.js";
import buscaAneis from "./config_buscas/anel.js";

export type Produto = {
  titulo: string;
  preco: string;
  link: string;
};

const pesquisaInput = "Engrenagem Motora 2 Dt 180";
const medidaInput = "";

type ScrapperArgs = {
  page: Page;
  pesquisa: string;
  paginaAtual: number;
  medida?: string;
  resultados?: {
    filtrados: Produto[];
    grupos: Record<string, Produto[]>;
  };
};

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

const page = context.pages()[0] ?? (await context.newPage())

async function testar({
  page,
  pesquisa,
  paginaAtual = 1,
  medida,
  resultados = { filtrados: [], grupos: {} },
}: ScrapperArgs): Promise<void> {
  const pesquisaComMedida =
    pesquisa + " " + (medida ? codigoParaMedida(medida) : "");

  const url = gerarUrl({
    pesquisa: medida ? pesquisaComMedida : pesquisa,
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
    console.log("Nenhum resultado encontrado para página " + paginaAtual);
  }

  const produtos: Produto[] = await page
    .locator(".poly-card__content")
    .evaluateAll((cards) =>
      cards.map((card) => {
        const tituloEl = card.querySelector(
          "a.poly-component__title",
        ) as HTMLAnchorElement | null;

        const precoEl = card.querySelector(".andes-money-amount__fraction");

        return {
          titulo: tituloEl?.textContent?.trim() ?? "",
          preco: precoEl?.textContent?.trim() ?? "",
          link: tituloEl?.href ?? "",
        };
      }),
    );

  const termosObrigatorios = ["engrenagem", "dt", "180"];

  const resultadoAtual = buscarProdutos(
    produtos,
    termosObrigatorios,
    buscaEngrenagem2AMotora,
  );

  const gruposAcumulados = { ...(resultados.grupos ?? {}) };

  // Adiciona os grupos encontrados nesta busca
  for (const [nomeGrupo, produtosGrupo] of Object.entries(
    resultadoAtual.grupos ?? {},
  )) {
    gruposAcumulados[nomeGrupo] = [
      ...(gruposAcumulados[nomeGrupo] ?? []),
      ...produtosGrupo,
    ];
  }

  resultados = {
    filtrados: [...resultados.filtrados, ...resultadoAtual.filtrados],
    grupos: gruposAcumulados,
  };

  const totalResultados = medida
    ? (resultados.grupos?.[medida]?.length ?? 0)
    : resultados.filtrados.length;

  const minimoResultados = medida ? 3 : 10;

  if (totalResultados < minimoResultados && paginaAtual < 3) {
    return testar({
      page,
      pesquisa,
      paginaAtual: paginaAtual + 1,
      medida,
      resultados,
    });
  }

  console.log("\nTotal encontrados:", resultados.filtrados.length);

  if (medida && Object.keys(resultados.grupos).length > 0) {
    console.log(
      "Encontrados com medida específicada: ",
      resultados.grupos[medida].length ?? "Nenhum resultado encontrado.",
    );
  }

  if (resultados.grupos && Object.keys(resultados.grupos).length > 0) {
    if (!medida) {
      console.log("\nResultados agrupados por medida:\n");
    }

    for (const [medidaGrupo, produtosGrupo] of Object.entries(
      resultados.grupos,
    )) {
      if (medida && medidaGrupo !== medida) {
        continue;
      }

      console.log("\n====================");
      console.log(`MEDIDA: ${formatarMedida(medidaGrupo)}`);
      console.log(`TOTAL: ${produtosGrupo.length}`);
      console.log("====================");

      produtosGrupo.forEach((produto, index) => {
        console.log(`\n#${index + 1}`);
        console.log("Título:", produto.titulo);
        console.log("Preço: R$", produto.preco);
      });
    }
  } else {
    console.log("\nResultados:\n");

    resultados.filtrados.forEach((produto, index) => {
      console.log(`\n#${index + 1}`);
      console.log("Título:", produto.titulo);
      console.log("Preço: R$", produto.preco);
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
  page: page,
  pesquisa: pesquisaInput,
  paginaAtual: 1,
  medida: medidaInput,
}).catch(console.error);
