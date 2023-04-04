import { getNumbers } from './helpers';

const lastItemNumber = 42;

export const items = getNumbers(1, lastItemNumber)
  .map(n => `Item ${n}`);

export const itemsCountPerPage = [3, 5, 10, 20];

export const pageByDefault = 1;
export const itemsCountByDefault = 5;
