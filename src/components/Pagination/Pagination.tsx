import React, { useMemo } from 'react';
import { PaginationProps } from '../../types/PaginationProps';
import classNames from 'classnames';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  items,
}) => {
  const navigationLinks = Math.ceil(total / perPage);
  const pager: number[] = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= navigationLinks; i++) {
      pages.push(i);
    }

    return pages;
  }, [navigationLinks]);

  const from = (currentPage - 1) * perPage;
  const to = (currentPage - 1) * perPage + perPage;
  const itemsToShow = items.slice(from, to);
  const prevPage = currentPage - 1 < 1 ? 1 : currentPage - 1;
  const nextPage =
    currentPage + 1 > pager.length ? pager.length : currentPage + 1;

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: prevPage === currentPage,
          })}
          onClick={() => onPageChange(prevPage)}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${prevPage}`}
            aria-disabled={prevPage === currentPage}
          >
            «
          </a>
        </li>
        {pager.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: nextPage === currentPage,
          })}
          onClick={() => onPageChange(nextPage)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${nextPage}`}
            aria-disabled={nextPage === currentPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsToShow.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
