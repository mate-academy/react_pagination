import { useMemo } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
};

export const ItemsList: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const itemsNumbers: number[] = getNumbers(1, total);

  const firstPageIndex = (currentPage - 1) * perPage;
  const lastPageIndex = Math.min(firstPageIndex + perPage, itemsNumbers.length);
  const currentTableData = useMemo(() => {
    return itemsNumbers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, perPage]);

  return (
    <ul>
      {currentTableData.map((item) => (
        <li data-cy="item" key={item}>
          {`Item ${item}`}
        </li>
      ))}
    </ul>
  );
};
