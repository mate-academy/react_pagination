import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  total,
  perPage,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const numberingPages = getNumbers(1, totalPages);

  const firsPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  const moveNextPage = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const movePrevPage = () => {
    if (!firsPage) {
      onPageChange(currentPage - 1);
    }
  };

  const moveToCurrentPage = (page: number) => {
    if (currentPage === page) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">

      <li className={cn('page-item',
        { disabled: firsPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={movePrevPage}
        >
          «
        </a>
      </li>

      {numberingPages.map(i => (
        <li
          key={i}
          className={cn('page-item',
            { active: currentPage === i })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`${i}`}
            onClick={() => moveToCurrentPage(i)}
          >
            {i}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={moveNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
