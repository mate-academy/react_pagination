import classNames from 'classnames';

import { getNumbers } from '../../utils';
import React from 'react';

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
  const pageItems = getNumbers(1, Math.ceil(total / perPage));

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pageItems.map(pageItem => {
          return (
            <li
              className={classNames('page-item', {
                active: pageItem === currentPage,
              })}
              key={pageItem}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${pageItem}`}
                onClick={() => onPageChange(pageItem)}
              >
                {pageItem}
              </a>
            </li>
          );
        })}

        <li
          className={classNames('page-item', {
            disabled: currentPage === pageItems.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageItems.length ? 'true' : 'false'}
            onClick={() => {
              if (currentPage < pageItems.length) {
                onPageChange(currentPage + 1);
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
