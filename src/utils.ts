export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const splitPages = (allPages: string[], amountRows: number) => {
  const book = [];
  let page: string[] = [];

  for (let i = 0; i < allPages.length; i += 1) {
    if (page.length === amountRows) {
      book.push(page);
      page = [allPages[i]];
    } else {
      page.push(allPages[i]);
    }
  }

  book.push(page);

  return book;
};
