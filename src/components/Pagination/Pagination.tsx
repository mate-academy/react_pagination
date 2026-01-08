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
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === pages;

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${isPrevDisabled ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isPrevDisabled ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              if (!isPrevDisabled) {
                onPageChange(currentPage - 1);
              }
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
              href={`#${idx + 1}`}
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
        <li className={`page-item ${isNextDisabled ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isNextDisabled ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              if (!isNextDisabled) {
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
