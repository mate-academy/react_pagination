import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  currentPage: number;
  onChangePage: (page: number) => void;
  itemsOnPage: number;
  totalItems: number;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  onChangePage,
  itemsOnPage,
  totalItems,
}) => {
  const countPage = Math.ceil(totalItems / itemsOnPage);
  const numbers = getNumbers(1, countPage);

  function prevPage() {
    if (currentPage !== 1) {
      onChangePage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== countPage) {
      onChangePage(currentPage + 1);
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
      {numbers.map(num => (
        <li
          className={cn('page-item', { active: num === currentPage })}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${currentPage}`}
            onClick={() => onChangePage(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === countPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPage}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
