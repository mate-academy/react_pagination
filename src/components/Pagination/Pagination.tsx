import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = props => {
  const totalPages = Math.ceil(props.total / props.perPage);
  const pageNumbers = getNumbers(1, totalPages);

  const currentPage = props.currentPage ?? 1;

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
              props.onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pageNumbers.map(n => (
        <li
          className={n === currentPage ? 'page-item active' : 'page-item'}
          key={n}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#{n}`}
            onClick={() => {
              if (n !== currentPage) {
                props.onPageChange(n);
              }
            }}
          >
            {n}
          </a>
        </li>
      ))}

      <li
        className={
          currentPage === totalPages ? 'page-item disabled' : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== totalPages) {
              props.onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
