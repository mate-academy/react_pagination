import cn from 'classnames';
import { getNumbers, getLastPage } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const firstPage = 1;
  const lastPage = getLastPage(total, perPage);
  const isFirst = currentPage === firstPage;
  const isLast = currentPage === lastPage;
  const pages = getNumbers(firstPage, lastPage);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isFirst,
        })}
      >
        <button
          data-cy="prevLink"
          aria-disabled={isFirst}
          type="button"
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </button>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: page === currentPage,
          })}
        >
          <button
            data-cy="pageLink"
            type="button"
            className="page-link"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: isLast,
        })}
      >
        <button
          data-cy="nextLink"
          aria-disabled={isLast}
          type="button"
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </button>
      </li>
    </ul>
  );
};
