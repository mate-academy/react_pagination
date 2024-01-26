import React, { MouseEvent } from 'react';

import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  totalItems: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: number) => void,
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items = getNumbers(1, totalItems)
    .map(n => `Item ${n}`);

  const pagesCount = Math.ceil(items.length / perPage);
  const pages = getNumbers(1, pagesCount);
  const fromItem = currentPage * perPage - perPage + 1;
  const toItem = (currentPage * perPage) > totalItems
    ? totalItems
    : currentPage * perPage;

  const handlePageSelector = (event: MouseEvent<HTMLElement>) => {
    const value = (event.target as HTMLElement).textContent;

    if (value) {
      switch (value) {
        case '«':
          // eslint-disable-next-line
          currentPage > 1
            ? onPageChange(currentPage - 1)
            : '';
          break;

        case '»':
          // eslint-disable-next-line
          currentPage < pagesCount
            ? onPageChange(currentPage + 1)
            : '';
          break;

        default:
          onPageChange(+value);
          break;
      }
    }
  };

  const prevClass = cn({
    'page-item': true,
    disabled: currentPage === 1,
  });

  const nextClass = cn({
    'page-item': true,
    disabled: currentPage === pagesCount,
  });

  return (
    <>
      {/* eslint-disable-next-line */}
      <ul
        className="pagination"
        onClick={handlePageSelector}
      >

        <li className={prevClass}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {pages.map((index) => {
          const liClass = cn({
            'page-item': true,
            active: currentPage === index,
          });

          return (
            <li className={liClass} key={index}>
              <a data-cy="pageLink" className="page-link" href={`#${index}`}>
                {index}
              </a>
            </li>
          );
        })}

        <li className={nextClass}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesCount}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((n, index: number) => {
          if (index >= fromItem - 1 && index <= toItem - 1) {
            return (<li data-cy="item" key={n}>{n}</li>);
          }

          return '';
        })}
      </ul>
    </>
  );
};
