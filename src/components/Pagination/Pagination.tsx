import cn from 'classnames';

import { PaginationParams } from '../../types';
import React from 'react';

export const Pagination: React.FC<PaginationParams> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numOfPages = Math.ceil(total / perPage);

  const pageClickHandler = (i: number) => {
    if (currentPage !== i + 1) {
      onPageChange(i + 1);
    }
  };

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
            href="#"
            aria-disabled={currentPage === 1}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {Array.from({ length: numOfPages }, (_, index) => (
          <li
            key={index}
            className={cn('page-item', {
              active: index + 1 === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#"
              onClick={() => pageClickHandler(index)}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === numOfPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#"
            aria-disabled={currentPage === numOfPages}
            onClick={() =>
              currentPage < numOfPages && onPageChange(currentPage + 1)
            }
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
