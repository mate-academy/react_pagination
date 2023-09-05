import React from 'react';
import cn from 'classnames';
import { getNumbers, getTotalPagesNumber } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange:
  (event: React.MouseEvent<HTMLAnchorElement>) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPagesNumber = getTotalPagesNumber(total, perPage);
  const pagesToRender = getNumbers(1, totalPagesNumber);
  const isFirstPageActive = currentPage === 1;
  const isLastPageActive = currentPage === totalPagesNumber;

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: isFirstPageActive,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPageActive}
            onClick={(event) => {
              if (!isFirstPageActive) {
                onPageChange(event);
              }
            }}
          >
            «
          </a>
        </li>

        {pagesToRender.map(pageNumber => (
          <li
            className={cn('page-item', {
              active: currentPage === pageNumber,
            })}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={(event) => onPageChange(event)}
            >
              {pageNumber}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: isLastPageActive,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPageActive}
            onClick={(event) => {
              if (!isLastPageActive) {
                onPageChange(event);
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
