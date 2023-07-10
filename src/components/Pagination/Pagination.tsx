import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = getNumbers(1, Math.ceil(total / perPage));

  const prevPageHandle = () => (
    currentPage !== 1 && onPageChange(currentPage - 1)
  );

  const nextPageHandle = () => (
    currentPage !== pageCount.length && onPageChange(currentPage + 1)
  );

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevPageHandle}
        >
          «
        </a>
      </li>

      {pageCount.map(item => (
        <li
          className={cn('page-item', { active: currentPage === item })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={
        cn('page-item', { disabled: currentPage === pageCount.length })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount.length}
          onClick={nextPageHandle}
        >
          »
        </a>
      </li>
    </ul>
  );
};
