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

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={(event) => {
              if (currentPage !== 1) {
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
            disabled: currentPage === totalPagesNumber,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPagesNumber}
            onClick={(event) => {
              if (currentPage !== totalPagesNumber) {
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
