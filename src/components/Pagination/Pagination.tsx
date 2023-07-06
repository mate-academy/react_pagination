import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const arrayOfPages = getNumbers(1, pageCount);

  function switchToPreviousPage(prevPage: number) {
    if (prevPage >= 1) {
      onPageChange(prevPage);
    }
  }

  function switchToNextPage(nextPage: number) {
    if (nextPage <= pageCount) {
      onPageChange(nextPage);
    }
  }

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage - 1}`}
          aria-disabled={'true' && currentPage === 1}
          onClick={() => switchToPreviousPage(currentPage - 1)}
        >
          «
        </a>
      </li>

      {arrayOfPages.map(n => (
        <li
          key={n}
          className={classNames(
            'page-item',
            { active: currentPage === n },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => {
              onPageChange(n);
            }}
          >
            {n}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        { disabled: currentPage === pageCount },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={'true' && currentPage === pageCount}
          onClick={() => switchToNextPage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
