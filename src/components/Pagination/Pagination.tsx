import React, { useMemo } from 'react';
import classNames from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = useMemo(() => {
    const numbers = [];

    for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
      numbers.push(i);
    }

    return numbers;
  }, [total, perPage]);

  const handlePrevClick = () => {
    const page = currentPage - 1;

    if (page > 0) {
      onPageChange(page);
    }
  };

  const handleNextClick = () => {
    const page = currentPage + 1;

    if (page && page <= pageNumbers.length) {
      onPageChange(page);
    }
  };

  const handleNumberClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
      >
        <button
          type="button"
          data-cy="prevLink"
          className="page-link"
          aria-disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          «
        </button>
      </li>

      {pageNumbers.map(pageNumber => (
        <li
          className={classNames(
            'page-item',
            {
              active: currentPage === pageNumber,
            },
          )}
          key={pageNumber}
        >
          <button
            type="button"
            data-cy="pageLink"
            className="page-link"
            onClick={() => handleNumberClick(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        {
          disabled: currentPage === pageNumbers.length,
        },
      )}
      >
        <button
          type="button"
          data-cy="nextLink"
          className="page-link"
          aria-disabled={currentPage === pageNumbers.length}
          onClick={handleNextClick}
        >
          »
        </button>
      </li>
    </ul>
  );
};
