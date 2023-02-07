import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page:number) => void,
};

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const totalPages = Math.ceil(total / perPage);
  const visiblePages = getNumbers(1, totalPages);

  const handlerPage = (page:number) => {
    if (currentPage !== page && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
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
          onClick={() => handlerPage(currentPage - 1)}
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 && 'true'}
        >
          «
        </a>
      </li>

      {visiblePages.map(page => (
        <li
          className={cn(
            'page-item',
            { active: currentPage === page },
          )}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlerPage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn(
        'page-item',
        { disabled: currentPage === totalPages },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages && 'true'}
          onClick={() => handlerPage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
