import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

type Direction = 'prev' | 'next';

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  perPage,
  onPageChange,
}) => {
  const handleArrowClick = (direction: Direction, condition: boolean) => {
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
                  if (currentPage !== page) {
                    onPageChange(page);
                  }
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
    </>
  );
};
