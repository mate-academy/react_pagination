import React from 'react';
import cn from 'classnames';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  paginationList: number[];
}

export const Pagination: React.FC<Props> = ({
  page,
  setPage,
  paginationList,
}) => {
  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: page === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={page === 1}
          onClick={() => {
            if (page !== 1) {
              setPage((currentPage) => currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {paginationList.map((number) => {
        return (
          <li
            className={cn('page-item', {
              active: page === number,
            })}
            key={number}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => {
                if (page !== number) {
                  setPage(number);
                }
              }}
            >
              {number}
            </a>
          </li>
        );
      })}
      <li
        className={cn('page-item', {
          disabled: page === paginationList.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={page === paginationList.length}
          onClick={() => {
            if (page !== paginationList.length) {
              setPage((currentPage) => currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
