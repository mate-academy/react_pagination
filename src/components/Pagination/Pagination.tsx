import classNames from 'classnames';
import React from 'react';

type PaginationType = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pages: number[];
};

export const Pagination: React.FC<PaginationType> = ({
  currentPage,
  setCurrentPage,
  pages,
}) => {
  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
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
          disabled: currentPage === pages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          aria-disabled={currentPage === pages.length ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
