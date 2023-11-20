import React from 'react';

type Props = {
  total: number // total number of items to paginate
  perPage: number // number of items per page
  currentPage: number /* optional with 1 by default */
  paginate: (page: number) => void
  previousPage: () => void
  nextPage: () => void
};

export const Pagination: React.FC<Props> = (
  {
    total, perPage, currentPage, paginate, previousPage, nextPage,
  },
) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === pageNumbers[0] ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === pageNumbers[0] ? 'true' : 'false'}
            onClick={previousPage}
          >
            «
          </a>
        </li>

        {pageNumbers.map(number => {
          return (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a
                onClick={() => paginate(number)}
                data-cy="pageLink"
                className="page-link"
                href={`#${number}`}
              >
                {number}
              </a>
            </li>
          );
        })}

        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageNumbers.length
              ? 'true'
              : 'false'}
            onClick={nextPage}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
