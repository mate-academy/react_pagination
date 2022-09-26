import React from 'react';
import classNames from 'classnames';

const { v4: uuidv4 } = require('uuid');

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: CallableFunction,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === amountOfPages;

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: isFirstPage,
          },
        )}
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
      {[...Array(amountOfPages)].map((_, pageLinkNumber) => (
        <li
          className={classNames(
            'page-item',
            {
              active: currentPage === pageLinkNumber + 1,
            },
          )}
          key={uuidv4()}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageLinkNumber + 1}`}
            onClick={() => onPageChange(pageLinkNumber + 1)}
          >
            {pageLinkNumber + 1}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          {
            disabled: isLastPage,
          },
        )}
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
  );
};