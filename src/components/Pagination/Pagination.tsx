import { FC } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils/utils';

interface PaginationProps {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (currentPage: number) => void
}

export const Pagination: FC<PaginationProps> = ({
  onPageChange,
  currentPage,
  perPage,
  total,
}) => {
  const totalPageCount = Math.ceil(total / perPage);
  const isFirstPageIndex = currentPage === 1;
  const isLastPageIndex = currentPage === totalPageCount;
  const paginationRange = getNumbers(1, totalPageCount);
  const handlePreviousPageClick = () => {
    return !isFirstPageIndex
      && onPageChange(currentPage - 1);
  };

  const handleNextPageClick = () => {
    return !isLastPageIndex
      && onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: isFirstPageIndex },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageIndex}
          onClick={handlePreviousPageClick}
        >
          «
        </a>
      </li>
      {paginationRange.map(page => (
        <li
          key={page}
          className={classNames('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        { disabled: isLastPageIndex },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageIndex}
          onClick={handleNextPageClick}
        >
          »
        </a>
      </li>
    </ul>

  );
};
