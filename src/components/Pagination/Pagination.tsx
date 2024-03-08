import React from 'react';

import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items: number[] = Array.from(
    { length: total },
    (_, index) => index + 1,
  );
  const pages: number[] = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, index) => index + 1,
  );
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages[pages.length - 1];

  return (
    <>
      <ul className="pagination">
        <li
          key="prev"
          className={cn('page-item', {
            disabled: isFirstPage,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => {
              if (!isFirstPage) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={cn('page-item', {
              active: currentPage === page,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={({ currentTarget: { text } }) => onPageChange(+text)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          key="next"
          className={cn('page-item', {
            disabled: isLastPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => {
              if (!isLastPage) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items
          .slice(currentPage * perPage - perPage, currentPage * perPage)
          .map(item => (
            <li data-cy="item" key={item}>
              Item {item}
            </li>
          ))}
      </ul>
    </>
  );
};
