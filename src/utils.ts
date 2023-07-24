export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function allChunks(array: number[], step: number): number[][] {
  const chunks = [];

  for (let i = 0; i < array.length; i += step) {
    const chunk = array.slice(i, i + step);

    chunks.push(chunk);
  }

  return chunks;
}
