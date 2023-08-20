import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  setCurrentPage: (value: number) => void;
  itemsPerPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const lastPage = Math.ceil(42 / itemsPerPage);
  const pages = getNumbers(1, lastPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: page === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === lastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={() => currentPage !== lastPage
            && setCurrentPage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
