import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange:(page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageAmount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageAmount);

  const equalFirst = currentPage === 1;
  const equalLast = currentPage === pageAmount;

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: equalFirst,
      })}
      >
        <button
          type="button"
          data-cy="prevLink"
          className="page-link"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (!equalFirst) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </button>
      </li>

      {pages.map(page => (
        <li
          className={classNames('page-item', {
            active: page === currentPage,
          })}
          key={page}
        >
          <button
            type="button"
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li className={classNames('page-item', {
        disabled: equalLast,
      })}
      >
        <button
          type="button"
          data-cy="nextLink"
          className="page-link"
          aria-disabled={currentPage === pageAmount}
          onClick={() => {
            if (!equalLast) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </button>
      </li>
    </ul>
  );
};
