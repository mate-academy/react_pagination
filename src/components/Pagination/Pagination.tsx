import cn from 'classnames';
import React, { useMemo } from 'react';

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
  const numberPages = Math.ceil(total / perPage);
  const pages = useMemo(
    () => new Array<number>(numberPages).fill(0).map((_, inx) => inx + 1),
    [numberPages],
  );

  const setNextPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const setPrevPage = () => {
    if (currentPage < numberPages) {
      onPageChange(currentPage + 1);
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
          onClick={setNextPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={cn('page-item', { active: currentPage === page })}
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

      <li
        className={cn('page-item', { disabled: currentPage === numberPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberPages}
          onClick={setPrevPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
