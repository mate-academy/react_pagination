import shortid from 'shortid';

export const getPossiblePagesPagination = (
  currentIndex: number,
  lastIndex: number,
) => {
  const outerArr = [];
  const neighboorCount = 1;
  const etcValue = '...';

  const start = Math.max(2, (currentIndex - neighboorCount));
  const end = Math.min((lastIndex - 1), (currentIndex + neighboorCount));

  for (let i = start; i <= end; i += 1) {
    outerArr.push(i);
  }

  if (currentIndex - neighboorCount > 2) {
    outerArr.unshift(etcValue);
  }

  if (currentIndex + neighboorCount < lastIndex - 1) {
    outerArr.push(etcValue);
  }

  if (lastIndex !== 1) {
    outerArr.push(lastIndex);
  }

  outerArr.unshift(1);

  return outerArr.map(value => ({
    value,
    key: shortid.generate(),
  }));
};
