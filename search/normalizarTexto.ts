  export default function normalizarTexto(texto: string): string {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[.,]/g, "."); // vírgula e ponto viram ponto
  }