import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void
};

function createRow(total: number, perPage: number) {
  const quntaty = Math.ceil(total / perPage);
  const res = [];

  for (let i = 1; i <= quntaty; i += 1) {
    res.push(i);
  }

  return res;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const quantity = Math.ceil(total / perPage);
  const pages = createRow(total, perPage);

  const changePage = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const nextPage = () => {
    if (currentPage !== quantity) {
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

      <li className={cn('page-item', { disabled: currentPage === quantity })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === quantity}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
