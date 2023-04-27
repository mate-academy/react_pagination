import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => {},
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage))
    .map(n => n);
  const pagesLength = pages.length;
  const changePage = (newPage: number) => {
    if (currentPage !== newPage) {
      onPageChange(newPage);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item',
            { disabled: currentPage - 1 === 0 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage - 1 <= 0}
            onClick={() => (
              currentPage - 1 > 0 && onPageChange(currentPage - 1)
            )}
          >
            «
          </a>
        </li>
        {
          pages.map(page => (
            <li
              className={classNames('page-item',
                { active: currentPage === page })}
              key={page}
              value={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => changePage(page)}
              >
                {page}
              </a>
            </li>
          ))
        }
        <li
          className={classNames('page-item',
            { disabled: currentPage + 1 > pagesLength })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage + 1 > pagesLength}
            onClick={() => (
              currentPage + 1 <= pagesLength && onPageChange(currentPage + 1)
            )}
          >
            »
          </a>
        </li>
      </ul>

    </>
  );
};
