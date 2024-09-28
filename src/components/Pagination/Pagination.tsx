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
  const totalPages = Math.ceil(total / perPage);

  const pagesList = [];

  for (let i = 1; i <= totalPages; i++) {
    pagesList.push(i);
  }

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

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {showPages}
      <li
        className={cn('page-item', {
          disabled: currentPage === pagesList[pagesList.length - 1],
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={`${currentPage === pagesList[pagesList.length - 1]}`}
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
