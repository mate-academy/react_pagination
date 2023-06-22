import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);

  const handleMoveRight = () => {
    if (currentPage !== pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handleMoveLeft = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          {
            disabled: isFirstPage,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handleMoveLeft}
        >
          «
        </a>
      </li>

      {pages.map((page) => (
        <li
          key={page}
          className={cn(
            'page-item', {
              active: currentPage === page,
            },
          )}
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

      <li
        className={cn(
          'page-item',
          {
            disabled: isLastPage,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleMoveRight}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
