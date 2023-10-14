import cn from 'classnames';
import { getNumbers } from '../../utils';

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
  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = currentPage === firstPage;
  const isLastPage = currentPage === lastPage;
  const pages = getNumbers(firstPage, lastPage);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isFirstPage,
        })}
      >
        <button
          data-cy="prevLink"
          aria-disabled={isFirstPage}
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
          disabled: isLastPage,
        })}
      >
        <button
          data-cy="nextLink"
          aria-disabled={isLastPage}
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
