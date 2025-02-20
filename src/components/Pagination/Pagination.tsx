import React from 'react';
import classNames from 'classnames';

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
  const pagesCount = Math.ceil(total / perPage);

  const pagesArray = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const currentPageItems = Array.from(
    { length: Math.min(perPage, total - (currentPage - 1) * perPage) },
    (_, i) => currentPage * perPage - perPage + 1 + i,
  );

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
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

        {pagesArray.map(page => (
          <li
            className={classNames('page-item', {
              active: page === currentPage,
            })}
            key={page}
            onClick={() => {
              onPageChange(page);
            }}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames('page-item', {
            disabled: currentPage === pagesCount,
          })}
          onClick={e => {
            e.preventDefault();
            if (currentPage < pagesCount) {
              onPageChange(currentPage + 1);
            }
          }}
        >
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
        {currentPageItems.map(item => (
          <li data-cy="item" key={item}>
            Item {item}
          </li>
        ))}
      </ul>
    </>
  );
};
