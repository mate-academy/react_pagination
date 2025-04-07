import React from 'react';
import { getNumbers } from '../utils';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {getNumbers(1, pages).map(n => (
        <li
          key={n}
          className={classNames('page-item', { active: n === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={e => {
              e.preventDefault();
              onPageChange(n);
            }}
          >
            {n}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', { disabled: currentPage === pages })}
      >
        <a
          aria-disabled={currentPage === pages ? 'true' : 'false'}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={e => {
            e.preventDefault();
            if (currentPage < pages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
