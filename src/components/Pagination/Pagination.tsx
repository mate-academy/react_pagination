import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / itemsPerPage);
  const pages = Array(numberOfPages).fill(0).map((_, i) => i + 1);
  const isPrevAreaDisabled = currentPage === 1;
  const isNextAreaDisabled = currentPage === numberOfPages;

  const handleClickToNext = (nextPage: number) => {
    return (currentPage !== numberOfPages
      && (onPageChange(nextPage)));
  };

  const handleClickToPrev = (previousPage: number) => {
    return (currentPage !== 1
      && (onPageChange(previousPage)));
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: isPrevAreaDisabled,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevAreaDisabled}
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
            onClick={() => (onPageChange(page))}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', {
        disabled: isNextAreaDisabled,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextAreaDisabled}
          onClick={() => handleClickToNext(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
