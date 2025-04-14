import React from 'react';
import { getNumbers } from '../../utils';
import { Props } from '../../types/Props';

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, pages).map(num => (
        <li
          className={currentPage === num ? 'page-item active' : 'page-item'}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => currentPage !== num && onPageChange(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li
        className={currentPage === pages ? 'page-item disabled' : 'page-item'}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages ? 'true' : 'false'}
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
