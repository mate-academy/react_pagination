import { PAGES_START_INDEX, TOTAL_ITEMS_NUMBER } from './constants';

export const utils = {
  getNumbers(from: number, to: number): number[] {
    const numbers: number[] = [];

    for (let n = from; n <= to; n += 1) {
      numbers.push(n);
    }

    return numbers;
  },

  getNumbersOfPages(itemsPerPage: string): number[] {
    const numberOfPages = Math.ceil(TOTAL_ITEMS_NUMBER / +itemsPerPage);

    return this.getNumbers(PAGES_START_INDEX, numberOfPages);
  },

  getItemsListPerPage(startIndex: number, endIndex: number): string[] {
    const items = this.getNumbers(startIndex, endIndex).map(n => `Item ${n}`);

    return items;
  },

  getStartIndex(itemsPerPage: string, selectedPage: number) {
    let startIndex = selectedPage;

    if (selectedPage > PAGES_START_INDEX) {
      startIndex = (selectedPage - 1) * +itemsPerPage + 1;
    }

    return startIndex;
  },

  getEndIndex(startIndex: number, itemsPerPage: string) {
    let endIndex = startIndex + +itemsPerPage - 1;

    if (endIndex > TOTAL_ITEMS_NUMBER) {
      endIndex = TOTAL_ITEMS_NUMBER;
    }

    return endIndex;
  },
};
