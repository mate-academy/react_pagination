import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  itemsFrom: number;
  itemsTo: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  itemsFrom,
  itemsTo,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const isLastPage = currentPage === lastPage;
  const isFirstPage = currentPage === 1;

  const items = getNumbers(itemsFrom, itemsTo)
    .map(item => (
      <li
        data-cy="item"
        key={item}
      >
        {`Item ${item}`}
      </li>
    ));

  const pages = getNumbers(1, lastPage)
    .map(page => (
      <li
        key={page}
        className={classNames('page-item', {
          active: page === currentPage,
        })}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${page}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </a>
      </li>
    ));

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: isFirstPage,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={isFirstPage}
            onClick={(event) => (
              isFirstPage
                ? event.preventDefault()
                : onPageChange(currentPage - 1)
            )}
          >
            «
          </a>
        </li>
        {pages}
        <li
          className={classNames('page-item', {
            disabled: isLastPage,
          })}
        >
          <a
            className="page-link"
            data-cy="nextLink"
            href={`#${currentPage}`}
            aria-disabled={isLastPage}
            onClick={(event) => (
              isLastPage
                ? event.preventDefault()
                : onPageChange(currentPage + 1)
            )}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items}
      </ul>
    </>
  );
};
