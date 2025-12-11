import React from 'react';
import { getNumbers } from '../../utils';

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
  const countOfPages = getNumbers(1, Math.ceil(total / perPage));

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={event => {
              if (currentPage !== 1) {
                event.preventDefault();
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {countOfPages.map(page => {
          return (
            <li
              key={page}
              className={`page-item ${currentPage === page ? 'active' : ''}`}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={event => {
                  event.preventDefault();

                  if (currentPage !== page) {
                    onPageChange(page);
                  }
                }}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={`page-item ${currentPage === countOfPages.length ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === countOfPages.length ? 'true' : 'false'
            }
            onClick={event => {
              if (currentPage !== countOfPages.length) {
                event.preventDefault();
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
