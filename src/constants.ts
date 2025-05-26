import { getNumbers } from './utils';

export const items = getNumbers(1, 42).map(n => `Item ${n}`);
export const TOTAL_AMOUNT_OF_ITEMS = items.length;
export type Option = '3' | '5' | '10' | '20';
export const OPTIONS_VALUES: Record<Option, number> = {
  '3': 3,
  '5': 5,
  '10': 10,
  '20': 20,
};
