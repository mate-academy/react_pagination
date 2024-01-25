import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {

  const quantityPages = Math.ceil(total / perPage);

  const allPages = getNumbers(1, quantityPages);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < quantityPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            «
          </a>
        </li>
        {allPages.map((page) => (
            <li
              key={page}
              className={cn('page-item', { active: page === currentPage })}
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
        <li className={cn('page-item',
          { disabled: currentPage === quantityPages })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === quantityPages}
            onClick={handleNextPage}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
