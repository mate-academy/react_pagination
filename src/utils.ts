export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

interface IObjectKeys {
  [key: string]: string[];
}

export const splitPages = (allPages: string[], step: number) => {
  const book: IObjectKeys = {};
  let page: string[] = [];
  let numOfPage = '1';

  for (let i = 0; i < allPages.length; i += 1) {
    if (page.length === step) {
      book[numOfPage] = page;
      numOfPage = String(+numOfPage + 1);
      page = [allPages[i]];
    } else {
      page.push(allPages[i]);
    }
  }

  book[numOfPage] = page;

  return book;
};

export const getFirstRow = (amount: number, position: number) => (
  position * amount - amount + 1
);

export const getLastRow = (
  amount: number,
  position: number,
  totalAmount: number,
) => {
  const lastRow = position * amount;

  return lastRow > totalAmount ? totalAmount : lastRow;
};
