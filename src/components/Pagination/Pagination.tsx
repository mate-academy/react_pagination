import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

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
  const numsOfPage = Math.ceil(total / perPage);
  const disabledPrev = currentPage === 1;
  const disabledNext = currentPage === numsOfPage;

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: disabledPrev })}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={disabledPrev}
        >
          «
        </a>
      </li>

      {getNumbers(1, numsOfPage).map(num => (
        <li
          className={cn('page-item', { active: num === currentPage })}
          key={num}
          onClick={() => onPageChange(num)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${num}`}>
            {num}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', { disabled: disabledNext })}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={disabledNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
