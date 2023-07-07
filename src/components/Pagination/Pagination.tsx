import React from 'react';
import cn from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
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

      {[...Array(totalPages)].map((_, pageIndex) => (
        <li
          key={`page-${pageIndex + 1}`}
          className={cn(
            'page-item',
            // eslint-disable-next-line quote-props
            { 'active': currentPage === pageIndex + 1 },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageIndex + 1}`}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </a>
        </li>
      ))}

      <li className={cn(
        'page-item',
        // eslint-disable-next-line quote-props
        { 'disabled': currentPage === totalPages },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
