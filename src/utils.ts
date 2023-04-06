export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getArrOfItemsForCurrPage = (
  sum: number,
  sumOfPosPerPage: number,
  currPage: number,
) => {
  const startPosition = currPage === 1
    ? 1
    : sumOfPosPerPage * currPage - sumOfPosPerPage + 1;

  const finalPosition = sumOfPosPerPage * currPage > sum
    ? sum
    : sumOfPosPerPage * currPage;

  const arrayOfItems = getNumbers(startPosition, finalPosition);

  return arrayOfItems;
};

export const getPages = (
  sum: number,
  sumOfPosPerPage: number,
) => {
  const sumOfPages = Math.ceil(sum / sumOfPosPerPage);

  const pages = getNumbers(1, sumOfPages);

  return pages;
};
