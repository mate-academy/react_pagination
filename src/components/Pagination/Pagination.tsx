import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  currentPage: number;
  totalPages: number;
  perPage: number;
  items: string[];
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  perPage,
  items,
  onPageChange,
}) => {
  const handleArrowClick = (direction: string, condition: boolean) => {
    const newPage = direction === 'prev'
      ? currentPage - 1
      : currentPage + 1;

    if (!condition) {
      onPageChange(newPage);
    }
  };

  const pages = getNumbers(1, Math.ceil(totalPages / perPage));
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages.length;

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: isFirstPage })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => handleArrowClick('prev', isFirstPage)}
          >
            «
          </a>
        </li>
        {pages.map(page => {
          const isChosen = page === currentPage;

          return (
            <li
              key={page}
              className={classNames('page-item', { active: isChosen })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => {
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li className={classNames('page-item', { disabled: isLastPage })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => handleArrowClick('next', isLastPage)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((item, index) => {
          const hasfirstItem = index >= (currentPage - 1) * perPage;
          const haslastItem = index < currentPage * perPage;

          if (hasfirstItem && haslastItem) {
            return (
              <li key={item} data-cy="item">{item}</li>
            );
          }

          return false;
        })}
      </ul>
    </>
  );
};
