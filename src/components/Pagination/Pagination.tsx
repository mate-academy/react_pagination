import React from 'react';
import cn from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page:number) => void,
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const pageQnty = total % perPage === 0
    ? total / perPage
    : Math.round(total / perPage + 1);

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
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage - 1 > 0) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {Array.from({ length: pageQnty }, (_, i) => (
          <li
            className={cn('page-item', {
              active: i + 1 === currentPage,
            })}
            key={i}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === pageQnty,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageQnty ? 'true' : 'false'}
            onClick={() => {
              if (currentPage + 1 <= pageQnty) {
                onPageChange(currentPage + 1);
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
