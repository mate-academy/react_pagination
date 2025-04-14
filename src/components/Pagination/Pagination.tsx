import React from 'react';
import classNames from 'classnames';
import { PaginationProps } from '../../interfaces/PaginationProps';
import { getNumbers } from '../../utils';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage !== 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage !== totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPagination = () => {
    const pages = getNumbers(1, totalPages);

    return pages.map(page => (
      <li
        key={page}
        className={classNames('page-item', { active: currentPage === page })}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${page}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </a>
      </li>
    ));
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={goToPreviousPage}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {renderPagination()}
      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={goToNextPage}
          aria-disabled={currentPage === totalPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
