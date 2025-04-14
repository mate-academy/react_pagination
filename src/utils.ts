export function getNumbers(from = 0, to: number): number[] {
  const arr: number[] = [];

  for (let i = from; i < to; i += 1) {
    arr.push(i);
  }

  return arr;
}

export enum SelectOptions {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}
