import { getNumbers } from './utils';

export const items = getNumbers(1, 42).map((n: number) => `Item ${n}`);
