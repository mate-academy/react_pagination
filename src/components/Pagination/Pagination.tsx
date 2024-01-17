import cn from 'classnames';
import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number, itemsPerPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber, perPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={cn('page-item', { active: currentPage === i })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pageNumbers;
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={
            currentPage === 1
              ? () => 0
              : () => handlePageChange(currentPage - 1)
          }
        >
          «
        </a>
      </li>
      {renderPageNumbers()}
      <li
        className={cn('page-item', { disabled: currentPage === totalPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={
            currentPage === totalPages
              ? () => 0
              : () => handlePageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
