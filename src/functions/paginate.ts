import { v4 as uuidv4 } from 'uuid';

export const paginate = (currentPage: number, lastPage: number) => {
  const delta = 1;
  const result = [];

  for (
    let i = Math.max(2, (currentPage - delta));
    i <= Math.min((lastPage - 1), (currentPage + delta));
    i += 1
  ) {
    result.push(i);
  }

  if ((currentPage - delta) > 2) {
    result.unshift('...');
  }

  if ((currentPage + delta) < (lastPage - 1)) {
    result.push('...');
  }

  result.unshift(1);
  if (lastPage !== 1) {
    result.push(lastPage);
  }

  return result.map(value => ({
    value,
    id: uuidv4(),
  }));
};
