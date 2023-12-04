import cn from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

function paginationsCount(
  total: number,
  perPage: number,
): number[] {
  const count = total / perPage;
  const result = [];

  for (let i = 0; i < count; i += 1) {
    result.push(i + 1);
  }

  return result;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const paginationNums = paginationsCount(total, perPage);
  const firstPage = paginationNums[0];
  const lastPage = paginationNums[paginationNums.length - 1];

  const prevPage = () => {
    if (currentPage !== firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item', {
          disabled: currentPage === firstPage,
        },
      )}
      >
        <a
          onClick={prevPage}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === firstPage}
        >
          «
        </a>
      </li>

      {paginationNums.map((page: number) => (
        <li
          key={page}
          className={cn(
            'page-item', {
              active: page === currentPage,
            },
          )}
        >
          <a
            onClick={() => onPageChange(page)}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn(
        'page-item', {
          disabled: currentPage === lastPage,
        },
      )}
      >
        <a
          onClick={nextPage}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
