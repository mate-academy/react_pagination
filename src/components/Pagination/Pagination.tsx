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
        <a
          data-cy="prevLink"
          aria-disabled={isFirstPage}
          href="#prev"
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            href={currentPage === page ? '' : `#${page}`}
            className="page-link"
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          aria-disabled={isLastPage}
          href="#next"
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
