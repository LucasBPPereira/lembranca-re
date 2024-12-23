export function verificaString(valor: string): string {
    if (valor.length >= 160) {
      const valorAtual = valor.slice(0, 160);
      return `${valorAtual}...`;
    }
    return `${valor}`;
  }