import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastItem = perPage * currentPage;
  const lastPage = Math.ceil(total / perPage);
  const toItem = lastItem > total ? total : lastItem;
  const fromItem = (perPage * (currentPage - 1)) + 1;
  const currentItems = getNumbers(fromItem, toItem);
  const pagesArray = getNumbers(1, lastPage);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              const newPage = currentPage - 1 <= 0
                ? 1
                : currentPage - 1;

              onPageChange(newPage);
            }}
          >
            «
          </a>
        </li>
        {pagesArray.map((page) => (
          <li
            key={page}
            className={cn('page-item', { active: currentPage === page })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', { disabled: currentPage === lastPage })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage ? 'true' : 'false'}
            onClick={() => {
              const newPage = currentPage + 1 >= lastPage
                ? lastPage
                : currentPage + 1;

              onPageChange(newPage);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentItems.map((item) => (
          <li
            key={item}
            data-cy="item"
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
