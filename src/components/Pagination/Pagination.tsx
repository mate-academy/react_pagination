import React from 'react';
import cn from 'classnames';

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
  const pages: number = Math.ceil(total / perPage);
  const isHandlePrevClick = currentPage === 1;
  const isHandleNextClick = currentPage === pages;

  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  const handleNextClick = () => {
    if (!isHandleNextClick) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (!isHandlePrevClick) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isHandlePrevClick })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isHandlePrevClick}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>

      {pageNumbers.map(pageNumber => (
        <li
          key={pageNumber}
          className={cn('page-item', { active: pageNumber === currentPage })}
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

      <li className={cn('page-item', { disabled: isHandleNextClick })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isHandleNextClick}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
