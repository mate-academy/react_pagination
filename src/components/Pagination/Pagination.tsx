import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  let totalPages = 0;

  if (perPage !== 0) {
    totalPages = Math.ceil(total / perPage);
  }

  const pagesList = Array.from({ length: totalPages }, (_, index) => index + 1);

  const showPages = pagesList.map(page => (
    <li
      key={page}
      className={cn('page-item', { active: currentPage === page })}
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
  ));

  const handlePrevClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onPageChange(currentPage - 1);
  };

  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
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
      {showPages}
      <li
        className={cn('page-item', {
          disabled:
            currentPage ===
            (pagesList.length > 0 ? pagesList[pagesList.length - 1] : 1),
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={`${currentPage === pagesList[pagesList.length - 1]}`}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
