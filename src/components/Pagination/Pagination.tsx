import React from 'react';
import classNames from 'classnames';
type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);
  };

  const handlePrevNextPageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      handlePageChange(currentPage - 1);
    }

    if (direction === 'next' && currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pages;
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#"
          aria-disabled={currentPage === 1}
          onClick={e => {
            e.preventDefault();
            handlePrevNextPageChange('prev');
          }}
        >
          «
        </a>
      </li>
      {renderPageNumbers()}
      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#"
          aria-disabled={currentPage === totalPages}
          onClick={e => {
            e.preventDefault();
            handlePrevNextPageChange('next');
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
