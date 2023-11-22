import cn from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  onPageChange: (value: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  onPageChange,
  currentPage,
}) => {
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pages.push(i);
  }

  const buttonNavigationLeft = (value: number) => cn(
    'page-item',
    { disabled: value === 1 },
  );

  const buttonNavigationRight = (value: number) => cn(
    'page-item',
    { disabled: value === pages.length },
  );

  const activePage = (value: number) => cn(
    'page-item',
    { active: value === currentPage },
  );

  return (
    <ul className="pagination">
      <li className={buttonNavigationLeft(currentPage)}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage === 1 ? 1 : currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={activePage(page)}
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
      <li className={buttonNavigationRight(currentPage)}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={() => onPageChange(currentPage === pages.length
            ? currentPage : currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
