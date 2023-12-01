import React from 'react';
import cn from 'classnames';

type Props = {
  currentPage: number,
  perPage: number,
  total: number,
  onPageChange: (value: number) => void,
};

function createRange(total: number, perPage: number) {
  const quantity = Math.ceil(total / perPage);
  const range = [];

  for (let i = 1; i <= quantity; i += 1) {
    range.push(i);
  }

  return range;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  perPage,
  total,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = createRange(total, perPage);

  const changePage = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const nextPage = () => {
    if (currentPage !== pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevPage}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li className={cn('page-item', { active: currentPage === page })}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => changePage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === pagesCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
