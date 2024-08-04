/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { getNumbers } from '../../utils';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  const isOnFirstPage = currentPage === 1;
  const isOnLastPage = currentPage === totalPages;

  const itemsOnPage = getNumbers(
    (currentPage - 1) * perPage + 1,
    Math.min(currentPage * perPage, total),
  );

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: isOnFirstPage })}>
          <a
            onClick={() => {
              if (!isOnFirstPage) {
                onPageChange(currentPage - 1);
              }
            }}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isOnFirstPage}
          >
            «
          </a>
        </li>
        {pages.map(page => {
          const isActive = page === currentPage;

          return (
            <li
              key={page}
              className={classNames('page-item', { active: isActive })}
            >
              <a
                onClick={() => {
                  if (!isActive) {
                    onPageChange(page);
                  }
                }}
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className={classNames('page-item', { disabled: isOnLastPage })}>
          <a
            onClick={() => {
              if (!isOnLastPage) {
                onPageChange(currentPage + 1);
              }
            }}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isOnLastPage}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {itemsOnPage.map(item => (
          <li key={item} data-cy="item">
            Item {item}
          </li>
        ))}
      </ul>
    </>
  );
};
