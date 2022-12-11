import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (currentPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, maxPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === maxPages;
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  const handlePageClick = (currPage: number) => (currPage !== currentPage) && (
    onPageChange(currPage)
  );

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item ',
        { disabled: isFirstPage },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isFirstPage}
          onClick={() => onPageChange(prevPage)}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            {
              active: page === currentPage,
            },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item ',
        { disabled: isLastPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isLastPage}
          onClick={() => onPageChange(nextPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
