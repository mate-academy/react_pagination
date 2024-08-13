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

  const goToPage = (newPage: number) => {
    if (newPage === currentPage) {
      return;
    }

    onPageChange(newPage);
  };

  const goToPrevPage = () => {
    if (currentPage === 1) {
      return;
    }

    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage === totalPages) {
      return;
    }

    goToPage(currentPage + 1);
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: isOnFirstPage })}>
          <a
            onClick={goToPrevPage}
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
                onClick={() => goToPage(page)}
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
            onClick={goToNextPage}
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
