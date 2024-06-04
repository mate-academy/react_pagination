import React from 'react';
import cn from 'classnames';

interface Props {
  totalItems: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <li
              className={cn('page-item', { active: currentPage === page })}
              key={page}
              onClick={() => onPageChange(page)}
            >
              <a data-cy="pageLink" className="page-link" href={`#${page}`}>
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={cn('page-item', { disabled: currentPage === totalPages })}
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {Array.from({ length: perPage }, (_, index) => {
          const itemNumber = perPage * (currentPage - 1) + 1 + index;

          return itemNumber <= totalItems ? (
            <li data-cy="item" key={itemNumber}>
              Item {itemNumber}
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
};
