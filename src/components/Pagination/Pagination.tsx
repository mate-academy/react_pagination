import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type PaginationProps = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: ((page:number) => void),
};
export const Pagination:React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = getNumbers(1, Math.ceil(total / perPage));

  const canMoveLeft = ():boolean => {
    return currentPage !== 1;
  };

  const canMoveRight = ():boolean => {
    return currentPage !== Math.max(...totalPages);
  };

  const moveLeft = () => {
    if (canMoveLeft()) {
      onPageChange(currentPage - 1);
    }
  };

  const moveRight = () => {
    if (canMoveRight()) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: !canMoveLeft(),
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={!canMoveLeft()}
          onClick={moveLeft}
        >
          «
        </a>
      </li>
      {
        totalPages.map(page => {
          return (
            <li
              key={page}
              className={cn('page-item', {
                active: page === currentPage,
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
          );
        })
      }
      <li
        className={cn('page-item', {
          disabled: !canMoveRight(),
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={!canMoveRight()}
          onClick={moveRight}
        >
          »
        </a>
      </li>
    </ul>
  );
};
