import { FC } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (a: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handleDec = () => {
    onPageChange(currentPage - 1);
  };

  const handleInc = () => {
    onPageChange(currentPage + 1);
  };

  const handleSetItem = (item: number) => {
    onPageChange(item);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handleDec}
        >
          «
        </a>
      </li>

      {getNumbers(1, totalPages).map((item) => {
        return (
          <li
            key={item}
            className={cn('page-item', { active: currentPage === item })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => {
                handleSetItem(item);
              }}
            >
              {item}
            </a>
          </li>
        );
      })}

      <li className={cn('page-item', { disabled: currentPage === totalPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handleInc}
        >
          »
        </a>
      </li>
    </ul>
  );
};
