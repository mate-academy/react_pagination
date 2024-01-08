import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  items: string[];
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const arrayItems: number[] = getNumbers(1, totalPages);
  const startItem = (currentPage - 1) * perPage;
  const endItem = currentPage * perPage;

  const handlePageChange = (newPage: number) => {
    if (currentPage !== newPage) {
      onPageChange(newPage);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item',
          { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={currentPage !== 1
              ? () => handlePageChange(currentPage - 1)
              : undefined}
          >
            «
          </a>
        </li>

        {arrayItems.map((item) => (
          <li
            key={item}
            className={cn('page-item',
              { active: currentPage === item })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => handlePageChange(item)}
            >
              {item}
            </a>
          </li>
        ))}

        <li className={cn('page-item',
          { disabled: currentPage === totalPages })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={currentPage !== totalPages
              ? () => handlePageChange(currentPage + 1)
              : undefined}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items
          .slice(startItem, endItem)
          .map((item) => (
            <li
              key={item}
              data-cy="item"
            >
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
