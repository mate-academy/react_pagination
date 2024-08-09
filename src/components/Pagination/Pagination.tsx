import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOfPages);

  const handlePrevClick = (
    currentEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    currentEvent.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (
    currentEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    currentEvent.preventDefault();
    if (currentPage < numberOfPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames('page-item', { active: page === currentPage })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={event => {
              event.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === numberOfPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
