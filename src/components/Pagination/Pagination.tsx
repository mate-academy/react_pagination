import React from 'react';
import classNames from "classnames";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul className="pagination">
      <li className={classNames ('page-item' , {
        disabled: currentPage === 1,
      })}
          >
        <button
          data-cy="prevLink"
          className="page-link"
          onClick={() =>
            currentPage !== 1 ? onPageChange(currentPage - 1) : null
          }
          aria-disabled={currentPage === 1}
        >
          «
        </button>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames ('page-item', {
          active: page === currentPage})}
        >
          <button
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(page)}
            aria-disabled={false}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        </li>
      ))}
      <li className={classNames('page-item', {disabled: currentPage === totalPages})}>
        <button
          data-cy="nextLink"
          className="page-link"
          onClick={() =>
            currentPage !== totalPages ? onPageChange(currentPage + 1) : null
          }
          disabled={currentPage === totalPages}
          aria-disabled={currentPage === totalPages}
        >
          »
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
