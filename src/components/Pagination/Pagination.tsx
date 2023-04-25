import React from 'react';
import classNames from 'classnames';

interface Props {
  items: string[];
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: CallableFunction;
}
export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item', { disabled: isFirstPage },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pageNumbers.map(pageNumber => (
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
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li className={classNames(
          'page-item', { disabled: isLastPage },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => {
              if (currentPage < Math.ceil(total / perPage)) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
