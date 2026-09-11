import { chromium } from "playwright";

import gerarUrl from "./search/gerarUrl";
import { codigoParaMedida, formatarMedida } from "./medidas";
import buscarProdutos from "./buscarProdutos";
import buscaPistao from "./buscas/pistao";
import buscaPistaoComAnel from "./buscas/pistaoComAnel";
import buscaGenerica from "./buscas/generica";

export type Produto = {
  titulo: string;
  preco: string;
  link: string;
};

const pesquisaInput = "Pistão Dt 180";
const medidaInput = "050";

type ScrapperArgs = {
  pesquisa: string;
  paginaAtual: number;
  medida?: string;
  resultados?: {
    filtrados: Produto[];
    grupos: Record<string, Produto[]> | undefined;
  };
};

async function testar({
  pesquisa,
  paginaAtual = 1,
  medida,
  resultados = { filtrados: [], grupos: undefined },
}: ScrapperArgs): Promise<void> {
  const context = await chromium.launchPersistentContext("./edge-perfil-ml-2", {
    headless: false,
    channel: "msedge",
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

  const metalLeveId = 10718678;
  const kmpId = 12084392;
  const audaxId = 2786154;
  const hondaId = 60559;
  const cofapId = 2431718;
  const yamahaId = 6351;
  const tokoId = 11022724;
  const genericaId = 276243;
  const rikId = 12274940;
  const suloyId = 12228342;
  const kimId = 9118848;

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

  // if (await page.locator(".ui-search-rescue").isVisible()) {
  //   return [];
  // }

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

  const palavrasObrigatorias = ["Dt", "180"];
  // const palavrasOpcionais: string[] = [];

  const resultadoAtual = buscarProdutos(
    produtos,
    palavrasObrigatorias,
    buscaPistaoComAnel,
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

if (totalResultados < minimoResultados) {
  console.log("Poucos resultados encontrados, buscando na próxima página.");

  if (paginaAtual < 3) {
    await testar({
      pesquisa,
      paginaAtual: paginaAtual + 1,
      medida,
      resultados,
    });
  }
}

  console.log("\nTotal encontrados:", produtos.length);
  console.log("Após filtro:", resultados.filtrados.length);

  if (resultados.grupos && Object.keys(resultados.grupos).length > 0) {
    console.log("\nResultados agrupados por medida:\n");

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

  process.stdin.on("data", async () => {
    await context.close();
    process.exit(0);
  });
}

testar({ pesquisa: pesquisaInput, paginaAtual: 1, medida: medidaInput }).catch(console.error);
