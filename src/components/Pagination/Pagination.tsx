import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  items: number,
  itemsPerPage: number,
  currentPage: number,
  onChangePage: (selected: number) => void,
};

export const Pagination: React.FC<Props> = ({
  items,
  itemsPerPage,
  currentPage,
  onChangePage,
}) => {
  const lastPages = Math.ceil(items / itemsPerPage);
  const pages = getNumbers(1, Math.ceil(lastPages));

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => {
              if (currentPage !== 1) {
                onChangePage(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={classNames(
              'page-item',
              {
                active: page === currentPage,
              },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => {
                if (page !== currentPage) {
                  onChangePage(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames(
            'page-item',
            {
              disabled: currentPage === lastPages,
            },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => {
              if (currentPage !== lastPages) {
                onChangePage(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
