import { getNumbers } from './utils';

export const totalItems = 42;
export const itemsPerPageConstant = [3, 5, 10, 20];

export const items = getNumbers(1, totalItems)
  .map(n => `Item ${n}`);
