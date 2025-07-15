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
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handlePageChange = (page: number) => {
    if (currentPage !== page && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            className={`page-item ${currentPage === page ? 'active' : ''}`}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => {
                e.preventDefault();
                handlePageChange(page);
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
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
