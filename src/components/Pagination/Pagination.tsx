import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const pages = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, n) => n + 1,
  );

  const moveLeft = () => {
    return currentPage > 1 && onPageChange(currentPage - 1);
  };

  const moveRight = () => {
    return currentPage < pages.length && onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item',
        { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={moveLeft}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={classNames('page-item',
            { active: currentPage === page })}
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
        { disabled: currentPage === pages.length })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={moveRight}
        >
          »
        </a>
      </li>
    </ul>
  );
};
