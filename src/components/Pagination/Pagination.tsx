import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (number: number) => void,
  pages: number[],
};

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  pages,
  currentPage,
  onPageChange,
}) => {
  const isFirstPage = currentPage === 1;
  const lastPage = Math.ceil(total / perPage);
  const isLastPage = currentPage === lastPage;

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disabled: isFirstPage },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => onPageChange((currentPage - 1))}
          >
            «
          </a>
        </li>
        {pages.map((page) => (
          <li
            className={classNames(
              'page-item',
              { active: page === currentPage },
            )}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={classNames(
          'page-item',
          { disabled: isLastPage },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => onPageChange((currentPage + 1))}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
