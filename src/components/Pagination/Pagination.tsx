import React, { useEffect, useState } from 'react';

type PaginationProps = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (newPage: number) => void,
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const [current, setCurrent] = useState(currentPage || 1);

  const handlePageClick = (page: number) => {
    if (current !== page) {
      setCurrent(page);
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  const handlePrev = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (current > 1) {
      setCurrent(current - 1);
    }

    if (onPageChange) {
      onPageChange(current - 1);
    }
  };

  const handleNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (current < totalPages) {
      setCurrent(current + 1);
    }

    if (onPageChange) {
      onPageChange(current + 1);
    }
  };

  useEffect(() => {
    if (currentPage !== undefined && currentPage !== current) {
      setCurrent(currentPage);
    }
  }, [currentPage]);

  // check for current page to never be higher than total
  useEffect(() => {
    if (totalPages < current) {
      setCurrent(totalPages);
    }
  }, [total, totalPages, current]);

  return (
    <div>
      <ul className="pagination">
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
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
              className={`page-item ${current === page ? 'active' : ''}`}
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

        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={handleNext}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
