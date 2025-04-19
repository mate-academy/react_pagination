import React from 'react';

type Props = {
  perPage: number;
  total: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  currentPage,
  onPageChange,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(total / perPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={e => {
            e.preventDefault();
            if (!isFirstPage) {
              prevPage();
            }
          }}
        >
          «
        </a>
      </li>
      {pageNumbers.map(n => (
        <li
          key={n}
          className={`page-item ${currentPage === n ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={e => {
              e.preventDefault();
              onPageChange(n);
            }}
          >
            {n}
          </a>
        </li>
      ))}
      <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={e => {
            e.preventDefault();
            if (!isLastPage) {
              nextPage();
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
