import React from 'react';
import cn from 'classnames';

interface Props {
  page: number;
  paginate: (num: number) => void;
  totalPages: number;
}

export const Pagination: React.FC<Props> = ({
  page,
  paginate,
  totalPages,
}) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: page <= 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${page}`}
          aria-disabled={page > 1 ? 'false' : 'true'}
          onClick={() => page > 1 && paginate(page - 1)}
        >
          «
        </a>
      </li>
      {
        pages.map((num) => (
          <li
            className={cn('page-item', {
              active: page === num,
            })}
            key={num}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${num}`}
              onClick={() => paginate(num)}
            >
              {num}
            </a>
          </li>
        ))
      }
      <li className={cn('page-item', {
        disabled: page >= pages.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${page}`}
          aria-disabled={page === totalPages ? 'true' : 'false'}
          onClick={() => page !== totalPages && paginate(page + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
