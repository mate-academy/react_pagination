import React from 'react';

type PaginationProps = {
  total: string[];
  perPage: number;
  currentPage: number;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(total.length / perPage);

  return (
    <>
      <ul className="pagination">
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;

          return (
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
            >
              <a data-cy="pageLink" className="page-link" href={`#${page}`}>
                {page}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {total.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
