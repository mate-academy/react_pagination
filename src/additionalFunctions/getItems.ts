import { getFirstAndLastItem } from './getFirstAndLastItem';

export function getItems(
  page: number,
  itemsPerPage: number,
  total: number,
): string[] {
  const items: string[] = [];
  const [firstItem, lastItem] = getFirstAndLastItem(page, itemsPerPage, total);

  for (let i = firstItem; i <= lastItem; i += 1) {
    items.push(`Item ${i}`);
  }

  return items;
}
