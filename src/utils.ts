export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPages(arrItems: string[][]): number[] {
  const result: number[] = [];
  let count: number = 0;

  for (let i = 1; i <= arrItems.length; i++) {
    count++;
    result.push(count);
  }

  return result;
}

export function getArrayItems(arrItems: string[], perPage: number): string[][] {
  const result: string[][] = [];

  for (let i = 0; i < arrItems.length; i += perPage) {
    const arrHelper: string[] = [];

    for (let j = i; j < i + perPage; j++) {
      // console.log(i + perPage);

      if (j < arrItems.length) {
        arrHelper.push(arrItems[j]);
      }
    }

    result.push(arrHelper);
  }

  return result;
}

export function getItemsForPrint(arr: string[][], value: number): string[] {
  const result = arr[value - 1];

  return result;
}
