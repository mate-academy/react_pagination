import React from 'react';
import cn from 'classnames';

type Props = {
  total: { id: number }[];
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => {},
}) => (
  <ul className="pagination">
    <li className={cn('page-item', { disabled: currentPage === 1 })}>
      <a
        data-cy="prevLink"
        className="page-link"
        href="#prev"
        aria-disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        «
      </a>
    </li>

    {total.map(pageNumber => (
      <li
        className={cn('page-item',
          { active: currentPage === pageNumber.id })}
        key={pageNumber.id}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${pageNumber.id}`}
          onClick={() => onPageChange(pageNumber.id)}
        >
          {pageNumber.id}
        </a>
      </li>
    ))}

    <li
      className={cn('page-item',
        { disabled: currentPage === total.length })}
    >
      <a
        data-cy="nextLink"
        className="page-link"
        href="#next"
        aria-disabled={currentPage === perPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        »
      </a>
    </li>
  </ul>
);
