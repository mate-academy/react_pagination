import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesAmount = Math.ceil(total / perPage);
  const pages: number[] = Array.from(
    { length: pagesAmount }, (_, index) => index + 1,
  );
  const isPageFirst = currentPage === 1;
  const isPageLast = currentPage === pagesAmount;

  const handlePrevPage = () => {
    if (!isPageFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isPageLast) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: isPageFirst })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPageFirst}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
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
      ))}

      <li className={classNames('page-item',
        { disabled: isPageLast })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isPageLast}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
