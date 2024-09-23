import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

enum LinkDirection {
  Forward = 'forward',
  Back = 'back,',
}

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const getNumOfPages = getNumbers(1, Math.ceil(total / perPage));

  const disabledPrevLink = currentPage === getNumOfPages[0];
  const disabledNextLink =
    currentPage === getNumOfPages[getNumOfPages.length - 1];

  const moveLink = (pageNum: number, direction: string) => {
    if (pageNum >= getNumOfPages[0] && direction === LinkDirection.Forward) {
      onPageChange(pageNum);
    }

    if (
      pageNum <= getNumOfPages[getNumOfPages.length - 1] &&
      direction === LinkDirection.Back
    ) {
      onPageChange(pageNum);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: disabledPrevLink })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={disabledPrevLink}
          onClick={() => moveLink(currentPage - 1, LinkDirection.Forward)}
        >
          «
        </a>
      </li>
      {getNumOfPages.map(pageNum => (
        <li
          key={pageNum}
          className={cn('page-item', { active: pageNum === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNum}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: disabledNextLink })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={disabledNextLink}
          onClick={() => moveLink(currentPage + 1, LinkDirection.Back)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
