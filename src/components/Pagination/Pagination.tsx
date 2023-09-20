import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  currentPage: number,
  lastPage: number,
  onChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  lastPage,
  onChange,
}) => {
  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, lastPage).map(page => (
        <li
          className={`page-item ${currentPage === page && 'active'}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              if (currentPage !== page) {
                onChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === lastPage && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={() => {
            if (currentPage !== lastPage) {
              onChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
