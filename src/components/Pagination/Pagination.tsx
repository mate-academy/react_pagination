import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  totalItems: string[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
  startItem: number;
  endItem: number;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  startItem,
  endItem,
}) => {
  const numberOfPages: number = Math.ceil(totalItems.length / itemsPerPage);
  const pages = getNumbers(1, numberOfPages);

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === pages[0],
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === pages[0]}
            onClick={() =>currentPage !== pages[0] && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            className={cn('page-item', {
              active: currentPage === page,
            })}
            key={page}
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
            disabled: currentPage === pages[pages.length - 1],
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages[pages.length - 1]}
            onClick={() => currentPage !== pages[pages.length - 1] && onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {totalItems.slice(startItem, endItem).map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
