import React from 'react';

type Data = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Data> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage - 1 === 0 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={`${currentPage - 1 === 0 ? 'true' : 'false'}`}
            onClick={e => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          >
            «
          </a>
        </li>
        {Array.from({ length: pages }).map((page, idx) => (
          <li
            className={`page-item ${idx + 1 === currentPage ? 'active' : ''}`}
            key={idx + 1}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#{page}`}
              key={idx + 1}
              onClick={e => {
                e.preventDefault();
                onPageChange(idx + 1);
              }}
            >
              {idx + 1}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={`${currentPage === pages ? 'true' : 'false'}`}
            onClick={e => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
