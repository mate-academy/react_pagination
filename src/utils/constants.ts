import { getNumbers } from './utils';

export const itemsTotal = 42;
export const pageByDefault = 1;
export const itemsByDefault = 5;
export const itemsPerPageOptions = [3, 5, 10, 20];

export const items = getNumbers(1, itemsTotal)
  .map(n => `Item ${n}`);
