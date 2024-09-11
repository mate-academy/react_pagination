import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsOnPage: string[];
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  itemsOnPage,
}) => {
  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <Link
          data-cy="prevLink"
          className={cn('page-link')}
          aria-disabled={currentPage === 1}
          to={`?page=${currentPage - 1}&perPage=${perPage}`}
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        >
          «
        </Link>
      </li>

      {getNumbers(
        1,
        total % perPage === 0 ? total / perPage : total / perPage + 1,
      ).map(num => (
        <li
          key={num}
          className={cn('page-item', { active: currentPage === num })}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={`?page=${num}&perPage=${perPage}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </Link>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: itemsOnPage[itemsOnPage.length - 1] === `Item ${total}`,
        })}
      >
        <Link
          data-cy="nextLink"
          className="page-link"
          aria-disabled={
            itemsOnPage[itemsOnPage.length - 1] === `Item ${total}`
          }
          to={`?page=${currentPage + 1}&perPage=${perPage}`}
          onClick={() =>
            itemsOnPage[itemsOnPage.length - 1] !== `Item ${total}` &&
            onPageChange(currentPage + 1)
          }
        >
          »
        </Link>
      </li>
    </ul>
  );
};
