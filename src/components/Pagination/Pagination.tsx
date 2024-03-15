import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange(page: number): void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  return (
    <ul className="pagination">
      <li
        className={cn({
          'page-item': true,
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(number => (
        <li
          className={cn({
            'page-item': true,
            active: currentPage === number,
          })}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </a>
        </li>
      ))}
      <li
        className={cn({
          'page-item': true,
          disabled: currentPage === pages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
