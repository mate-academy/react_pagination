import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

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
}) => {
  const numberPage = getNumbers(1, Math.ceil(total / perPage));

  return (
    <ul className="pagination">
      <li className={`page-item ${cn({ disabled: currentPage === 1 })}`}>
        <a
          onClick={
            currentPage === 1
              ? () => 0
              : () => onPageChange(currentPage - 1)
          }
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {numberPage.map(page => (
        <li className={`page-item ${cn({ active: page === currentPage })}`}>
          <a
            onClick={() => onPageChange(page)}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item ${cn({ disabled: currentPage === numberPage.length })}`}>
        <a
          onClick={
            currentPage === numberPage.length
              ? () => 0
              : () => onPageChange(currentPage + 1)
          }
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberPage.length}
        >
          »
        </a>
      </li>
    </ul>
  );
};
