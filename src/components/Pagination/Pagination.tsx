import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type PaginationType = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: number;
};

export const Pagination: React.FC<PaginationType> = ({
  currentPage,
  setCurrentPage,
  pageCount,
}) => {
  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        >
          «
        </a>
      </li>

      {getNumbers(1, pageCount).map(page => (
        <li
          key={page}
          className={classNames('page-item', {
            active: currentPage === page,
          })}
        >
          <a
            onClick={() => setCurrentPage(page)}
            data-cy="pageLink"
            className="page-link"
            href="#1"
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === pageCount,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() =>
            currentPage < pageCount && setCurrentPage(currentPage + 1)
          }
          aria-disabled={currentPage === pageCount ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
