import React from 'react';
import classNames from 'classnames';

export interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <nav>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <button
            data-cy="prevLink"
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
        </li>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;

          return (
            <li
              key={pageNumber}
              className={classNames('page-item', {
                active: pageNumber === currentPage,
              })}
            >
              <button
                data-cy="pageLink"
                className="page-link"
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li
          className={classNames('page-item', {
            disabled: currentPage === totalPages,
          })}
        >
          <button
            data-cy="nextLink"
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
