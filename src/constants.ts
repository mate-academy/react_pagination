import { getNumbers } from './utils';

export const items = getNumbers(1, 42).map(n => `Item ${n}`);
export const ALLOWED_PER_PAGE = [3, 5, 10, 20];
