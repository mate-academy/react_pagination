import cn from 'classnames';

import { PaginationProps } from '../../types/PaginationProps';
import { getNumbers } from '../../utils';

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pageNumber = Math.ceil(total / perPage);
  const generatePageItems = (pageAmount: number) => {
    const pageNumbers = getNumbers(1, pageAmount);

    return pageNumbers.map(i => (
      <li
        key={i}
        className={cn('page-item', {
          active: currentPage === i,
        })}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
          onClick={() => {
            onPageChange(i);
          }}
        >
          {i}
        </a>
      </li>
    ));
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {generatePageItems(pageNumber)}
      <li
        className={cn('page-item', {
          disabled: currentPage === pageNumber,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageNumber ? 'true' : 'false'}
          onClick={() =>
            currentPage < pageNumber && onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
