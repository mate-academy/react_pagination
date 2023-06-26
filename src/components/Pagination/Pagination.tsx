import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onNextLink: (numberOfPages: number) => void;
  onPrevLink: () => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onNextLink,
  onPrevLink,
}) => {
  const numberOfPages = getNumbers(1, Math.ceil(total / perPage));

  return (
    <ul className="pagination">
      <li
        className={cn('page-item',
          { disabled: currentPage <= 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={
            currentPage <= 1
              ? 'true'
              : 'false'
          }
          onClick={onPrevLink}
        >
          «
        </a>
      </li>
      {numberOfPages.map(pageNumber => (
        <li
          key={pageNumber}
          className={cn('page-item',
            { active: currentPage === pageNumber })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item',
          { disabled: currentPage >= numberOfPages.length })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            currentPage >= numberOfPages.length
              ? 'true'
              : 'false'
          }
          onClick={() => onNextLink(numberOfPages.length)}
        >
          »
        </a>
      </li>
    </ul>
  );
}
