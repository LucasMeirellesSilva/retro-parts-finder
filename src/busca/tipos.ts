export type Produto = {
  titulo: string;
  preco: string;
  link: string;
};

export interface ContextoBusca {
  produto: Produto;
  titulo: string;
  termosObrigatorios: string[];
}

export type RegraBusca = (
  ctx: ContextoBusca
) => boolean;

export type Extrator<T> = (
  titulo: string,
) => T[];

export type ChaveGrupo <T> = (extracao: T) => string; 

export interface ConfiguracaoBusca<T = never> {
  regras: RegraBusca[];
  extrator?: Extrator<T>;
  chaveGrupo?: ChaveGrupo<T>;
}

export interface ResultadoExtracao<T> {
  produto: Produto;
  extracoes: T[];
}

export type Detector<T> = (
  titulo: string,
) => T | undefined;

export type DetectorMultiplos<T> = (
  titulo: string,
) => T[];