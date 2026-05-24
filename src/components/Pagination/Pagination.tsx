import type { FC } from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, index) => index + 1,
  );
  const lastPage = pages.length;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          href="#prev"
          className="page-link"
          data-cy="prevLink"
          aria-disabled={currentPage === 1}
          onClick={event => {
            event.preventDefault();
            handlePageChange(currentPage - 1);
          }}
        >
          &laquo;
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            href={`#page-${page}`}
            className="page-link"
            data-cy="pageLink"
            onClick={event => {
              event.preventDefault();
              handlePageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
        <a
          href="#next"
          className="page-link"
          data-cy="nextLink"
          aria-disabled={currentPage === lastPage}
          onClick={event => {
            event.preventDefault();
            handlePageChange(currentPage + 1);
          }}
        >
          &raquo;
        </a>
      </li>
    </ul>
  );
};
