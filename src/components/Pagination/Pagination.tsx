import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const allPages = getNumbers(1, lastPage);

  const handleClickPrevPage = () => {
    onPageChange(
      currentPage > 1
        ? currentPage - 1
        : currentPage,
    );
  };

  const handleClickNextPage = () => {
    onPageChange(
      currentPage < lastPage
        ? currentPage + 1
        : currentPage,
    );
  };

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          { disabled: currentPage === 1 },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handleClickPrevPage}
        >
          «
        </a>
      </li>
      {allPages.map(page => (
        <li
          key={page}
          className={cn(
            'page-item',
            { active: currentPage === page },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn(
          'page-item',
          { disabled: currentPage === lastPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={handleClickNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
