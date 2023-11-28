import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (id: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countPage = Math.ceil(total / perPage);
  const pages = Array.from({ length: countPage }, (_, i) => i + 1);

  const pagination = pages.map((i) => (
    <li
      className={cn(
        'page-item',
        { active: i === currentPage },
      )}
      key={i}
    >
      <a
        data-cy="pageLink"
        className="page-link"
        href={`#${i}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </a>
    </li>
  ));

  const CanMovePrevPage = currentPage > 1;
  const CanMoveNextPage = countPage > currentPage;

  const nextPage = () => {
    if (CanMoveNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (CanMovePrevPage) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: !CanMovePrevPage },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={!CanMovePrevPage}
          onClick={prevPage}
        >
          «
        </a>
      </li>

      {pagination}

      <li className={cn(
        'page-item',
        { disabled: !CanMoveNextPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={!CanMoveNextPage}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
