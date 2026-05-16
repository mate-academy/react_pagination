import React from 'react';
import classNames from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages: number = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {pageNumbers.map((number: number) => (
        <li
          key={number}
          className={classNames('page-item', {
            active: number === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={e => {
              e.preventDefault();
              if (number === currentPage) {
                return;
              }

              onPageChange(number);
            }}
          >
            {number}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
