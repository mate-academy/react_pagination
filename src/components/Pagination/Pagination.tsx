import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

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
  const allPages = Math.ceil(total / perPage);

  const handleSetPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const page = Number(event.currentTarget.dataset.currentPage);

    if (page < 1 || page === currentPage || page > allPages) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          data-current-page={currentPage - 1}
          onClick={handleSetPage}
        >
          «
        </a>
      </li>

      {getNumbers(1, allPages).map((page) => (
        <li
          className={cn(
            'page-item',
            { active: page === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            data-current-page={page}
            href={`#${page}`}
            onClick={handleSetPage}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn(
        'page-item',
        { disabled: currentPage === allPages },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === allPages}
          data-current-page={currentPage + 1}
          onClick={handleSetPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
