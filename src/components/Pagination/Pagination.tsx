import React from 'react';
import cn from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (pageNumber: number) => void;
  itemsArr: string[],
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  itemsArr,
}) => {
  const pagesCount = Math.round(total % perPage) === 0
    ? Math.round(total / perPage)
    : Math.round(total / perPage) + 1;
  const totalPages: number[] = new Array(pagesCount)
    .fill(null).map((_, index: number) => index + 1);

  const firstPageIsActive = currentPage === 1;
  const lastPageIsActive = currentPage === pagesCount;

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1
              ? 'true'
              : 'false'}
            onClick={() => {
              if (!firstPageIsActive) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {totalPages.map((pageNumber: number) => (
          <li
            className={cn('page-item',
              { active: currentPage === pageNumber })}
            key={pageNumber}
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
        <li className={cn('page-item',
          { disabled: currentPage === totalPages.length })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages.length
              ? 'true'
              : 'false'}
            onClick={() => {
              if (!lastPageIsActive) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsArr.map((item) => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
