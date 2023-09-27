import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil((total / perPage));
  const pages = getNumbers(1, pagesCount);
  const prevLinkDisabled = currentPage === 1;
  const nextLinkDisabled = currentPage === pagesCount;
  /* disabled */

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: prevLinkDisabled })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevLinkDisabled}
          onClick={() => !prevLinkDisabled && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map(cellNumber => (
        <li
          className={cn('page-item', { active: currentPage === cellNumber })}
          key={cellNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${cellNumber}`}
            onClick={() => onPageChange(cellNumber)}
          >
            {cellNumber}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', { disabled: nextLinkDisabled })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextLinkDisabled}
          onClick={() => !nextLinkDisabled && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
