import classNames from 'classnames';
import React, { useEffect } from 'react';

type PaginationProps = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (newPage: number) => void,
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageClick = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const handlePrev = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // check for current page to never be higher than total
  useEffect(() => {
    if (totalPages < currentPage) {
      onPageChange(totalPages);
    }
  }, [total, totalPages, currentPage]);

  return (
    <div>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: currentPage <= 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage <= 1 ? 'true' : 'false'}
            onClick={handlePrev}
          >
            «
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;

          return (
            <li
              key={page}
              className={classNames(
                'page-item', { active: currentPage === page },
              )}
              data-cy={`page-${page}`}
            >
              <a
                className="page-link"
                data-cy="pageLink"
                href={`#${page}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={classNames(
            'page-item', { disabled: currentPage >= totalPages },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage >= totalPages ? 'true' : 'false'}
            onClick={handleNext}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
