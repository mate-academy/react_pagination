import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const isPrevDisabled = totalPages === 0 || currentPage === 1;
  const isNextDisabled = totalPages === 0 || currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const firstItem = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, total);

  return (
    <div>
      <p data-cy="info">
        Page {currentPage} (items {firstItem} - {lastItem} of {total})
      </p>

      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={e => {
          const newPerPage = Number(e.target.value);

          onPerPageChange(newPerPage);
        }}
      >
        {[3, 5, 10, 20].map(n => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <ul className="pagination">
        {/* Prev button */}
        <li className={isPrevDisabled ? 'disabled' : ''}>
          <a
            href="#"
            data-cy="prevLink"
            aria-disabled={isPrevDisabled}
            onClick={e => {
              e.preventDefault();
              if (!isPrevDisabled) {
                handlePageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {/* Page links */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <li key={page} className={page === currentPage ? 'active' : ''}>
            <a
              href="#"
              data-cy="pageLink"
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={e => {
                e.preventDefault();
                handlePageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        {/* Next button */}
        <li className={currentPage === totalPages ? 'disabled' : ''}>
          <a
            href="#"
            data-cy="nextLink"
            aria-disabled={isNextDisabled}
            onClick={e => {
              e.preventDefault();
              if (!isNextDisabled) {
                handlePageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
