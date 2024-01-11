import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  items: string[];
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void
};

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const arrayItem: number[] = getNumbers(1, totalPages);
  const startItem = (currentPage - 1) * perPage;
  const endItem = currentPage * perPage;

  const pageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={() => pageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {arrayItem.map((page) => (
          <li
            key={page}
            className={cn('page-item', { active: page === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#prev"
              onClick={() => pageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={() => pageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.slice(startItem, endItem).map((item) => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
