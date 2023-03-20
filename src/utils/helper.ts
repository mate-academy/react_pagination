export const getRangeOfItems = (
  total:number,
  currentPage: number,
  perPage:number,
) => {
  const firstNumber = currentPage * perPage - (perPage - 1);
  let lastNumber;

  if (currentPage * perPage > total) {
    lastNumber = total;
  } else {
    lastNumber = currentPage * perPage;
  }

  return [firstNumber, lastNumber];
};

export const createInfo = (
  current: number,
  firstItem:number,
  lastItem: number,
  total: number,
) => {
  return `Page ${current} (items ${firstItem} - ${lastItem} of ${total})`;
};
