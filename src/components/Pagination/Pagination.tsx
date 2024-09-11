import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isPageFirst = currentPage === 1;
  const isPageLast = currentPage === totalPages;

  const handleBackwardsClick = () => {
    if (!isPageFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handleForwardsClick = () => {
    if (!isPageLast) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: isPageFirst })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isPageFirst}
            onClick={handleBackwardsClick}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              active: currentPage === page,
            })}
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
        <li className={classNames('page-item', { disabled: isPageLast })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isPageLast}
            onClick={handleForwardsClick}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
