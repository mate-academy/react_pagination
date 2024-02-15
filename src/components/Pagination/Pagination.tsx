import cn from "classnames";
import React from "react";
import { PaginationProps } from "../../types/PaginationProps";
import { getNumbers } from "../../utils";

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const lastPage: number = Math.ceil(total / perPage);
  const pages: number[] = getNumbers(1, lastPage);

  return (
    <ul className="pagination">
      <li
        className={cn("page-item", {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map((page) => {
        return (
          <li
            onClick={() => onPageChange(page)}
            className={cn("page-item", {
              active: currentPage === page,
            })}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={cn("page-item", {
          disabled: currentPage === lastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={() => {
            if (currentPage !== lastPage) {
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
