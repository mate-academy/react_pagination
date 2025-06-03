import cn from 'classnames';
import { getNumbers } from '../../utilities/utils';

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
  const end = Math.ceil(total / perPage);
  const numbers = getNumbers(1, end);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === end;

  const handlePrevLink = () => {
    if (!isPrevDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextLink = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          'page-item disabled': isPrevDisabled,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={handlePrevLink}
        >
          «
        </a>
      </li>

      {numbers.map(num => (
        <li
          key={num}
          className={cn('page-item', {
            'page-item active': currentPage === num,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={() => onPageChange(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          'page-item disabled': isNextDisabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={handleNextLink}
        >
          »
        </a>
      </li>
    </ul>
  );
};
