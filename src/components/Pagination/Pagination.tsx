import React from 'react';
import cn from 'classnames';

type Props = {
  currentPage: number;
  perPage: number;
  total: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage, perPage, total, setCurrentPage,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = new Array(lastPage).fill(0).map((_, index) => index + 1);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          onClick={() => {
            if (currentPage === 1) {
              return;
            }

            setCurrentPage(currentPage - 1);
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li key={page} className={cn('page-item',
          { active: currentPage === page })}>
          <a
            onClick={() => {
              setCurrentPage(page);
            }}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === lastPage })}>
        <a
          onClick={() => {
            if (currentPage === lastPage) {
              return;
            }

            setCurrentPage(currentPage + 1);
          }}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
