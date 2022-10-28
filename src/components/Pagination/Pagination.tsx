import React from 'react';
import cn from 'classnames';

import { getNumbers } from '../../utils';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalPages, currentPage, onPageChange,
}) => {
  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => currentPage !== 1 && onPageChange((currentPage - 1))}
        >
          «
        </a>
      </li>

      {getNumbers(1, totalPages).map(pageNumber => (
        <li
          className={cn('page-item', { active: pageNumber === currentPage })}
          key={pageNumber}
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
        className={cn('page-item', { disabled: currentPage === totalPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => currentPage !== totalPages
            && onPageChange((currentPage + 1))}
        >
          »
        </a>
      </li>
    </ul>
  );
};
