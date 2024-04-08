import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  perPage: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numbers = getNumbers(1, perPage);

  function prevPage() {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== perPage) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevPage}
        >
          «
        </a>
      </li>
      {numbers.map((n, i) => (
        <li className={cn('page-item', { active: currentPage === n })} key={i}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === perPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === perPage}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
