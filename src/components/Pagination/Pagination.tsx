import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numPages).map(n => n);

  return (
    <ul className="pagination">
      <li className={currentPage === 1
        ? 'page-item disabled'
        : 'page-item'}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            return (currentPage === 1
              ? null
              : onPageChange(currentPage - 1));
          }}
        >
          «
        </a>
      </li>
      {pages.map(num => (
        <li
          key={num}
          className={currentPage === num
            ? 'page-item active'
            : 'page-item'}
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
      ))}
      <li className={currentPage === numPages
        ? 'page-item disabled'
        : 'page-item'}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numPages}
          onClick={() => {
            return (currentPage === numPages
              ? null
              : onPageChange(currentPage + 1));
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
