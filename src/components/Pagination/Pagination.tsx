import React from 'react';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(firstItem + perPage - 1, total);

  return (
    <>
      <ul data-cy="pagination">
        <li className={currentPage === 1 ? 'disabled' : ''}>
          <a
            data-cy="prevLink"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={
              currentPage === 1
                ? undefined
                : () => onPageChange(currentPage - 1)
            }
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li key={page} className={page === currentPage ? 'active' : ''}>
            <a
              data-cy="pageLink"
              onClick={
                page !== currentPage ? () => onPageChange(page) : undefined
              }
            >
              {page}
            </a>
          </li>
        ))}
        <li className={currentPage === totalPages ? 'disabled' : ''}>
          <a
            data-cy="nextLink"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={
              currentPage === totalPages
                ? undefined
                : () => onPageChange(currentPage + 1)
            }
          >
            »
          </a>
        </li>
      </ul>
      <div data-cy="info">
        Page {currentPage} (items {firstItem} - {lastItem} of {total})
      </div>
      <select
        value={perPage}
        data-cy="perPageSelector"
        onChange={e => onPerPageChange(Number(e.target.value))}
      >
        {[3, 5, 10, 20].map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};
