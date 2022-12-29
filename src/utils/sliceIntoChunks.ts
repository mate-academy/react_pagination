export default function sliceIntoChunks<T>(
  items: T[],
  total: number,
  itemsPerChunk: number,
): T[][] {
  const slicedItems = [];

  for (
    let firstItemIndex = 0;
    firstItemIndex < total;
    firstItemIndex += itemsPerChunk
  ) {
    const lastItemIndex = firstItemIndex + itemsPerChunk < total
      ? firstItemIndex + itemsPerChunk
      : total;

    slicedItems.push(items.slice(
      firstItemIndex,
      lastItemIndex,
    ));
  }

  return slicedItems;
}
