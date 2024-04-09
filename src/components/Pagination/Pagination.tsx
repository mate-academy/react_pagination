import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  totalItems: number;
  itemPerPage: number;
  onPageChange: (page: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemPerPage,
  onPageChange,
  currentPage,
}) => {
  const pages = getNumbers(1, Math.ceil(totalItems / itemPerPage));

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1 ? true : false,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map((page, index) => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={index}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage >= pages.length ? true : false,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => {
            if (currentPage !== pages.length) {
              onPageChange(currentPage + 1);
            }
          }}
          aria-disabled={currentPage === pages.length ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
