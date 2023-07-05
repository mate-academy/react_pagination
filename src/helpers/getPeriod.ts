export function getPeriod(
  cursor: number,
  periodOfPage: number,
  countOfAllItems: number,
) {
  const from = (cursor - 1) * periodOfPage + 1;
  const to = cursor * periodOfPage > countOfAllItems
    ? countOfAllItems
    : cursor * periodOfPage;

  return [from, to];
}
