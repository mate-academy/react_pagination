import { getNumbers } from './utils';

export const totalItemsCount = 42;

export const items = getNumbers(1, totalItemsCount)
  .map(n => `Item ${n}`);

export const itemsPerPageList = [3, 5, 10, 20];
export const defaultItemsPerPage = itemsPerPageList[1];
