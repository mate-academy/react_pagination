import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      <ul
        className="pagination"
        onKeyDown={e => {
          if (e.key === 'ArrowRight' && currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }

          if (e.key === 'ArrowLeft' && currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
        tabIndex={0}
      >
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 && 'true'}
            onClick={e => {
              e.preventDefault();

              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages && 'true'}
            onClick={e => {
              e.preventDefault();

              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
