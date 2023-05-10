// import React from "react";

import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => unknown;
};

export const Pagination: React.FC<Props> = (
  {
    total, perPage, currentPage, onPageChange,
  },
) => {
  const visiblePage = Math.ceil(total / perPage);
  const items = Array.from({ length: visiblePage }, (_, index) => index + 1);
  const visibleItems = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <>
      <ul className="pagination">
        <li
          className={
            classNames('page-item',
              { disabled: currentPage === 1 })
          }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>

        {items.map((elem) => {
          return (
            <li
              className={
                classNames(
                  'page-item',
                  { active: currentPage === elem },
                )
              }
              key={elem}
            >
              <a
                onClick={e => {
                  onPageChange(+e.currentTarget.innerHTML);
                }}
                data-cy="pageLink"
                className="page-link"
                href={`#${elem}`}
              >
                {elem}
              </a>
            </li>
          );
        })}
        <li
          className={
            classNames(
              'page-item',
              { disabled: currentPage === visiblePage },
            )
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={() => {
              if (currentPage === visiblePage) {
                return;
              }

              onPageChange(currentPage + 1);
            }}
            aria-disabled={currentPage === visiblePage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => {
          const maxVisiblePage = perPage * currentPage;
          const minVisiblePage = maxVisiblePage - perPage;

          if (item > minVisiblePage && item <= maxVisiblePage) {
            return (
              <li
                data-cy="item"
                key={item}
              >
                {`Item ${item}`}
              </li>
            );
          }

          return '';
        })}
      </ul>
    </>
  );
};
