import React from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];

  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === firstPage ? 'disabled' : ''}`}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={`${currentPage === firstPage ? 'true' : 'false'}`}
            onClick={e => {
              if (currentPage === firstPage) {
                e.preventDefault();

                return;
              }

              onPageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>

        {pageNumbers.map(num => {
          return (
            <li
              className={`page-item ${currentPage === num ? 'active' : ''}`}
              key={num}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${num}`}
                onClick={() => onPageChange(num)}
              >
                {num}
              </a>
            </li>
          );
        })}

        <li
          className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={`${currentPage === lastPage ? 'true' : 'false'}`}
            onClick={e => {
              if (currentPage === lastPage) {
                e.preventDefault();

                return;
              }

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
