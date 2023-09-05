import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const numberOfPages = Math.ceil(total / itemsPerPage);
  const pages = Array(numberOfPages).fill(0).map((_, i) => i + 1);

  const handleClickToNext = (nextPage: number) => {
    return (currentPage !== numberOfPages
      && (setCurrentPage(nextPage)));
  };

  const handleClickToPrev = (previousPage: number) => {
    return (currentPage !== 1
      && (setCurrentPage(previousPage)));
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handleClickToPrev(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: currentPage === page })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => (setCurrentPage(page))}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', {
        disabled: currentPage === numberOfPages,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages}
          onClick={() => handleClickToNext(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
