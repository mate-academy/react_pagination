export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function prepareItems(
  itemsArray: number[],
  itemPerPage: number,
  currentPage: number,
): number[] {
  const firstNumber = (currentPage - 1) * itemPerPage + 1;
  let lastNumber = itemPerPage * currentPage;

  if (lastNumber > itemsArray[itemsArray.length - 1]) {
    lastNumber = itemsArray[itemsArray.length - 1];
  }

  const indexOfFirst = itemsArray.indexOf(firstNumber);
  const indexOfLast = itemsArray.indexOf(lastNumber);

  return itemsArray.slice(indexOfFirst, indexOfLast + 1);
}
