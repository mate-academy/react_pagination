import { getNumbers } from '../utils';
import { itemsCount } from './itemsCount';

export const items = getNumbers(itemsCount.min, itemsCount.max)
  .map(n => `Item ${n}`);
