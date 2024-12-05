import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value1: number) => void;
  itemsToShow: number[];
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  itemsToShow,
}) => {
  // const pagesToShow = Array.from(
  //   { length: Math.ceil(total / perPage) },
  //   (_, i) => i + 1,
  // );
  const pagesToShow = getNumbers(1, Math.ceil(total / perPage));

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {pagesToShow.map(page => (
          <li
            className={cn('page-item', { active: currentPage === page })}
            key={page}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === pagesToShow.length,
          })}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesToShow.length}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsToShow.map(item => (
          <li key={item} data-cy="item">
            Item {item}
          </li>
        ))}
      </ul>
    </>
  );
};
