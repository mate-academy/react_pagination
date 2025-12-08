import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const arrOfNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    arrOfNumbers.push(i + 1);
  }

  return (
    <ul className="pagination">
      <li
        className={`page-item ${currentPage === 1 || total === 0 ? 'disabled' : ''}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 || total === 0}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {arrOfNumbers.map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === +page ? 'active' : ''}`}
          onClick={() => {
            if (page !== currentPage) {
              onPageChange(+page);
            }
          }}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages || total === 0 ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages || total === 0}
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
