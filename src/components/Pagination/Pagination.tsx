import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  items: string[];
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange, items,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  const onClickHandle = (page: number) => {
    const validPage = Math.min(Math.max(page, 1), totalPages);

    onPageChange(validPage);
  };

  const startItemIndex = (currentPage - 1) * perPage;
  const endItemIndex = Math.min(currentPage * perPage, total);
  const showItems = items.slice(startItemIndex, endItemIndex);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => onClickHandle(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={cn('page-item', {
              active: currentPage > 0 && currentPage <= pages.length
                ? page === currentPage
                : page === 1,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onClickHandle(page)}
            >
              {page}
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
            onClick={() => onClickHandle(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {showItems.map((item) => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
