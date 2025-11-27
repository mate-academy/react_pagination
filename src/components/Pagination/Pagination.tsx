type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

import * as React from 'react';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const arrayPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) {
    event.preventDefault();
    if (page > totalPages || page < 1 || page === currentPage) {
      return;
    }

    onPageChange(page);
  }

  const startDiapason = (currentPage - 1) * perPage + 1;
  const endDiapason = Math.min(currentPage * perPage, total);

  return (
    <>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {startDiapason} - {endDiapason} of {total})
      </p>

      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => handleClick(e, currentPage - 1)}
          >
            «
          </a>
        </li>

        {arrayPages.map(page => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => handleClick(e, page)}
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
            aria-disabled={currentPage === totalPages}
            onClick={e => handleClick(e, currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
