import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

enum LinkDirection {
  Forward = 'forward',
  Back = 'back',
}
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
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  const disabledPrevLink = currentPage === pages[0];
  const disabledNextLink = currentPage === totalPages;

  const moveLink = (pageNum: number, direction: string) => {
    if (direction === LinkDirection.Back && pageNum >= pages[0]) {
      onPageChange(pageNum);
    }

    if (direction === LinkDirection.Forward && pageNum <= totalPages) {
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
          onClick={() =>
            !disabledPrevLink && moveLink(currentPage - 1, LinkDirection.Back)
          }
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
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: disabledNextLink })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={disabledNextLink}
          onClick={() =>
            !disabledNextLink &&
            moveLink(currentPage + 1, LinkDirection.Forward)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
