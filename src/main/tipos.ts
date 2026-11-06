import { Page } from "playwright";

export type Produto = {
  titulo: string;
  preco: string;
  link: string;
};

export type ContextoBusca = {
  produto: Produto;
  titulo: string;
  termosObrigatorios: string[];
};

export type RegraBusca = (ctx: ContextoBusca) => boolean;
 
export type Extrator<T> = (titulo: string) => T[];

export type ChaveGrupo<T> = (extracao: T) => string;

export type ConfiguracaoBusca<T = never> = {
  regras: RegraBusca[];
  extrator?: Extrator<T>;
  chaveGrupo?: ChaveGrupo<T>;
};

// export type ArgumentosPesquisa = {
//   page: Page;
//   categoria: Categoria,
//   mecanismoBusca: ConfiguracaoBusca<string>,
//   grupoMotocicletas: GrupoMotocicletas,
//   paginaAtual: number;
//   grupo?: string;
//   resultados?: {
//     filtrados: Produto[];
//     grupos: Record<string, Produto[]>;
//   };
// };

export type ArgumentosPesquisa = {
  page: Page;
  pesquisa: string;
  paginaAtual: number;
  grupo?: string;
  resultados?: {
    filtrados: Produto[];
    grupos: Record<string, Produto[]>;
  };
};

export type ResultadoExtracao<T> = {
  produto: Produto;
  extracoes: T[];
};

export type Detector<T> = (titulo: string) => T | undefined;

export type DetectorMultiplos<T> = (titulo: string) => T[];

export type Categoria = {
  nome: string;
  slug: string;
  categoriaPai?: Categoria;
};

export type AnosMotocicleta = {
  anos: number[];
};

export type VersaoMotocicleta = {
  titulo: string;
  apelido: string;
  anos: AnosMotocicleta;
};

export type Motocicleta = {
  modelo: string;
  versoes: VersaoMotocicleta[];
};

export type GrupoMotocicletas = {
  nome: string;
  codigo: string;
  motocicletas: Motocicleta[];
};
