import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesQuantity = Math.ceil(total / perPage);
  const arrayOfPages = getNumbers(1, pagesQuantity);

  return (
    <ul
      className="pagination"
    >
      <li
        className={classNames('page-item', {
          disabled: currentPage <= 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange((currentPage - 1));
            }
          }}
        >
          «
        </a>
      </li>
      {arrayOfPages.map(page => (
        <li
          className={classNames('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage >= pagesQuantity,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesQuantity}
          onClick={() => {
            if (currentPage < pagesQuantity) {
              onPageChange((currentPage + 1));
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
