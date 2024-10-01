import React, { useMemo } from 'react';
import classNames from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  items: string[];
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  items,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const [startIndex, endIndex] = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, total);

    return [start, end];
  }, [currentPage, perPage, total]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const currentItems = items.slice(startIndex, endIndex);

  return (
    <div>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <button
            data-cy="prevLink"
            className="page-link"
            aria-disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <li
              key={pageNumber}
              className={classNames('page-item', {
                active: currentPage === pageNumber,
              })}
            >
              <button
                data-cy="pageLink"
                className="page-link"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li
          className={classNames('page-item', {
            disabled: currentPage === totalPages,
          })}
        >
          <button
            data-cy="nextLink"
            className="page-link"
            aria-disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </li>
      </ul>
    </div>
  );
};
