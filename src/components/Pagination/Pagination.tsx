import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const isSelectedFirstPage = currentPage === 1;
  const isSelectedLastPage = currentPage === totalPages;

  const handleSelectPrevPage = () => {
    if (!isSelectedFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleSelectNextPage = () => {
    if (!isSelectedLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isSelectedFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isSelectedFirstPage}
          onClick={handleSelectPrevPage}
        >
          «
        </a>
      </li>

      {getNumbers(1, totalPages).map(pageNumber => (
        <li
          key={pageNumber}
          className={cn('page-item', {
            active: currentPage === pageNumber,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: isSelectedLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isSelectedLastPage}
          onClick={handleSelectNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
