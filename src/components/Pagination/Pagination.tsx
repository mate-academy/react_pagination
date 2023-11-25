import cn from 'classnames';
import React from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const amountOfPages = Math.ceil(total / perPage);
  const arrayOfPages = Array.from(Array(amountOfPages).keys());

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>


      {arrayOfPages.map(pageNumber => (
        <li
          className={cn(
            'page-item',
            { active: pageNumber + 1 === currentPage },
          )}
          key={pageNumber + 1}
        >
          <a
            onClick={() => {
              if (currentPage !== pageNumber + 1) {
                onPageChange(pageNumber + 1);
              }
            }}
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber + 1}`}
          >
            {pageNumber + 1}
          </a>
        </li>
      ))}

      <li
        className={cn(
          'page-item',
          { disabled: currentPage === amountOfPages },
        )}
      >
        <a
          onClick={() => {
            if (currentPage !== amountOfPages) {
              onPageChange(currentPage + 1);
            }
          }}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === amountOfPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
