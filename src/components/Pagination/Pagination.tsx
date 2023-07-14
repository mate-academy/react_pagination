import React from 'react';
import cn from 'classnames';

import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pagination = getNumbers(1, pageCount);

  const prevPage = () => {
    const newPage = currentPage === 1
      ? currentPage
      : currentPage - 1;

    onPageChange(newPage);
  };

  const nextPage = () => {
    const newPage = currentPage === pagination.length
      ? currentPage
      : currentPage + 1;

    onPageChange(newPage);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          onClick={prevPage}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 && true}
        >
          «
        </a>
      </li>
      {pagination.map((item) => (
        <li
          key={item}
          className={cn('page-item', { active: currentPage === item })}
        >
          <a
            onClick={() => {
              if (item !== currentPage) {
                onPageChange(item);
              }
            }}
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
          >
            {`${item}`}
          </a>
        </li>
      ))}
      <li className={
        cn('page-item', { disabled: currentPage === pagination.length })
      }
      >
        <a
          onClick={nextPage}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagination.length && true}
        >
          »
        </a>
      </li>
    </ul>
  );
};
