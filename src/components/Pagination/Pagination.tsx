import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  const [prev, setPrev] = useState(currentPage - 1);
  const [next, setNext] = useState(currentPage + 1);

  useEffect(() => {
    setNext(currentPage + 1);
    setPrev(currentPage - 1);
  }, [currentPage]);

  const isLastPage = currentPage === pages.length;
  const isFirstPage = currentPage === 1;

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => {
            if (!isFirstPage) {
              onPageChange(prev);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: currentPage === page,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => {
            if (!isLastPage) {
              onPageChange(next);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
