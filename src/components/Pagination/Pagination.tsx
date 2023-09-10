import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numbersOfPages = Math.ceil(total / perPage);
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === numbersOfPages;

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= numbersOfPages) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isCurrentPageFirst,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isCurrentPageFirst}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {getNumbers(1, numbersOfPages).map((page) => (
        <li
          className={cn('page-item', {
            active: page === currentPage,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: isCurrentPageLast,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isCurrentPageLast}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
