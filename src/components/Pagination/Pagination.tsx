import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  currentPage: number;
  amountItem: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  amountItem,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / amountItem);
  const numberOfPage = getNumbers(1, lastPage);

  const selectPrev = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const selectNext = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={selectPrev}
        >
          «
        </a>
      </li>

      {numberOfPage.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: page === currentPage })}
        >
          <a
            href={`#${page}`}
            className="page-link"
            data-cy="pageLink"
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === lastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={selectNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
