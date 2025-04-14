import React from 'react';
import cn from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<number>;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page !== currentPage && onPageChange) {
      onPageChange(page);
    }
  };

  const generatePages = () => {
    const result = [];

    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }

    return result;
  };

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => !isFirstPage && handlePageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {generatePages().map(page => (
          <li
            key={page}
            className={cn('page-item', { active: currentPage === page })}
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

        <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
