import React from 'react';
import cn from 'classnames';
import {
  calcEndItem,
  calcPages,
  calcStartItem,
  getNumbers,
} from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = calcPages(total, perPage);

  const isTheFirstPage = currentPage === 1;
  const isTheLastPage = currentPage === pagesCount;

  const handlePageChange = (page: number) => () => onPageChange(page);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: isTheFirstPage,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isTheFirstPage}
            onClick={handlePageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {getNumbers(1, pagesCount).map(page => (
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
              onClick={handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={cn('page-item', {
          disabled: isTheLastPage,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isTheLastPage}
            onClick={handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getNumbers(
          calcStartItem(currentPage, perPage),
          calcEndItem(currentPage, perPage, total),
        ).map(item => (
          <li key={item} data-cy="item">{`Item ${item}`}</li>
        ))}
      </ul>
    </>
  );
};
