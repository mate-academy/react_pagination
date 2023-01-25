import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const requiredPages = Math.ceil(total / perPage);
  const pageList = Array.from({ length: requiredPages }, (_, i) => i + 1);

  const firstPage = pageList[0];
  const lastPage = pageList[pageList.length - 1];
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <ul className="pagination">
      <li
        className={
          currentPage === firstPage
            ? 'page-item disabled'
            : 'page-item'
        }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === firstPage}
          onClick={() => {
            if (currentPage === firstPage) {
              return;
            }

            onPageChange(previousPage);
          }}
        >
          «
        </a>
      </li>
      {pageList.map(page => (
        <li
          className={
            page === currentPage
              ? 'page-item active'
              : 'page-item'
          }
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={
          currentPage === lastPage
            ? 'page-item disabled'
            : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={() => {
            if (currentPage === lastPage) {
              return;
            }

            onPageChange(nextPage);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
