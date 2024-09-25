import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (val: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));
  const handlePrev = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === pages.length) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrev}
        >
          «
        </a>
      </li>
      {pages.map(num => (
        <li
          key={num}
          className={cn('page-item', { active: currentPage === num })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', { disabled: currentPage === pages.length })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
