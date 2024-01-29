import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  function getPreparePages() {
    const stop = Math.ceil(total / perPage);
    const preparePages = getNumbers(1, stop);

    return preparePages;
  }

  const visiblePages = getPreparePages();

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {visiblePages.map(x => (
        <li
          key={x}
          role="presentation"
          className={cn('page-item', {
            active: currentPage === Number(x),
          })}
          onClick={() => onPageChange((x))}
          onKeyDown={() => onPageChange(Number(x))}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${x}`}
          >
            {x}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === visiblePages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === visiblePages.length}
          onClick={() => {
            if (currentPage !== visiblePages.length) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
