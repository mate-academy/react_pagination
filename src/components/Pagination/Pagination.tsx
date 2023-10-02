import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

interface PaginationTypes {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<PaginationTypes> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesEmount = total / perPage;

  return (
    <ul className="pagination">
      <li className="page-item disabled">
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>

      {getNumbers(1, pagesEmount).map(page => (
        <li
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      {/* <li className="page-item active">
          <a data-cy="pageLink" className="page-link" href="#1">1</a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#2">2</a>
        </li> */}

      <li className="page-item disabled">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
