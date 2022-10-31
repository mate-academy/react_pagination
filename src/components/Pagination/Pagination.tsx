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
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === firstPage },
          )}
          onClick={() => onChangePage(currentPage - 1, lastPage)}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>
        {pageItemsList.map(pageNumber => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            className={classNames(
              'page-item',
              { active: currentPage === pageNumber },
            )}
            onClick={() => onChangePage(pageNumber)}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === lastPage },
          )}
          onClick={() => onChangePage(currentPage + 1, lastPage)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
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
