import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

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
  const amountOfPages = Math.ceil(total / perPage);
  const numbers = getNumbers(1, amountOfPages);
  const prevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== amountOfPages) {
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
          onClick={prevPage}
        >
          «
        </a>
      </li>
      {numbers.map(el => (
        <li
          className={cn('page-item', { active: el === currentPage })}
          key={el}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${currentPage}`}
            onClick={() => onPageChange(el)}
          >
            {el}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', { disabled: currentPage === amountOfPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === amountOfPages}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
