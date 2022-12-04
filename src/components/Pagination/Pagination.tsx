/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const getArrayPages = getNumbers(1, numberOfPages);
  const goDirection = (direction: string) => {
    if (direction === 'prev') {
      onPageChange(currentPage - 1);
    }

    if (direction === 'next') {
      onPageChange(currentPage + 1);
    }
  };

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
          href={`#${currentPage}`}
          aria-disabled="true"
          onClick={() => goDirection('prev')}
        >
          «
        </a>
      </li>

      {getArrayPages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
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

      <li className={classNames(
        'page-item',
        { disabled: currentPage === numberOfPages },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled="false"
          onClick={() => goDirection('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
