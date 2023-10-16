import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type PaginationOptions = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: Dispatch<SetStateAction<number>>,
};

export const Pagination: React.FC<PaginationOptions> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationOptions) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li
        className={`page-item ${cn({
          disabled: currentPage === 1,
        })}`}
        onClickCapture={() => {
          if (currentPage !== 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={`page-item ${cn({
            active: currentPage === page,
          })}`}
          key={`page-item-${page}`}
          onClickCapture={() => {
            if (page !== currentPage) {
              onPageChange(page);
            }
          }}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${cn({
          disabled: currentPage === totalPages,
        })}`}
        onClickCapture={() => {
          if (currentPage !== totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === totalPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
