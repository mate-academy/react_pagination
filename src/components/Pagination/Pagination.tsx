import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  pageItems: string[],
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  pageItems,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const isTheFirstPage = currentPage === 1;
  const isTheLastPage = currentPage === totalPages;
  const pageNumbers = getNumbers(1, totalPages);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: isTheFirstPage },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={isTheFirstPage}
            onClick={() => {
              if (!isTheFirstPage) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pageNumbers.map(pageNumber => (
          <li
            key={pageNumber}
            className={classNames(
              'page-item',
              { active: currentPage === pageNumber },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={() => {
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item',
            { disabled: isTheLastPage },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={isTheLastPage}
            onClick={() => {
              if (!isTheLastPage) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {pageItems.map(pageItem => (
          <li
            data-cy="item"
            key={pageItem}
          >
            {pageItem}
          </li>
        ))}
      </ul>
    </>
  );
};
