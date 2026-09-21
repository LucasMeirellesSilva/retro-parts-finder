export default function gerarSlugPesquisa(pesquisa: string): string {
  return pesquisa
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/,/g, ".")                // 16,5 -> 16.5
    .replace(/[^a-z0-9.]+/g, "-")      // preserva o ponto
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}