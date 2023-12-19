import classNames from 'classnames';
import React from 'react';

interface Props {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (newPage: number) => void
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const elementsArray = Array.from(
    { length: lastPage },
    (_, index) => index + 1,
  );

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage && newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: currentPage <= 1,
        },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {elementsArray.map((page) => {
        return (
          <li
            key={page}
            className={
              classNames('page-item', { active: page === currentPage })
            }
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li className={classNames(
        'page-item',
        {
          disabled: currentPage >= lastPage,
        },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage >= lastPage}
          onClick={() => goToPage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
