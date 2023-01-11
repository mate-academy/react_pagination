import React from 'react';
import cn from 'classnames';

interface Props {
  currentPage: number;
  onPageChange: (num: number) => void;
  total: number;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  total,
}) => {
  const pages = [];

  for (let i = 1; i <= total; i += 1) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage <= 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage > 1 ? 'false' : 'true'}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {
        pages.map((num) => (
          <li
            className={cn('page-item', {
              active: currentPage === num,
            })}
            key={num}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${num}`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </a>
          </li>
        ))
      }
      <li className={cn('page-item', {
        disabled: currentPage >= pages.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === total ? 'true' : 'false'}
          onClick={() => currentPage !== total && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
