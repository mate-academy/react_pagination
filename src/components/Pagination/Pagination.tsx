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
  const pages: number[] = [];
  const isPageFirst = currentPage === 1;
  const isPageLast = currentPage === pagesAmount;

  for (let i = 1; i <= pagesAmount; i += 1) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (!isPageFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handlelastPage = () => {
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
          onClick={handlelastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
