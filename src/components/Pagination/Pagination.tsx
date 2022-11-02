import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onChangePage: (page: number, maxCountOfPages?: number) => void;
  items: string[];
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onChangePage,
    items,
  },
) => {
  const firstPage = 1;
  const lastPage = Math.ceil(total / perPage);
  const pageItemsList = getNumbers(firstPage, lastPage);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === firstPage },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => onChangePage(currentPage - 1, lastPage)}
          >
            «
          </a>
        </li>
        {pageItemsList.map(pageNumber => (
          <li
            className={classNames(
              'page-item',
              { active: currentPage === pageNumber },
            )}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={() => onChangePage(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === lastPage },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => onChangePage(currentPage + 1, lastPage)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((item: string) => <li data-cy="item" key={item}>{item}</li>)}
      </ul>
    </>
  );
};
