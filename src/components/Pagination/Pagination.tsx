import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handleCurrentPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#"
          aria-disabled={`${currentPage === 1 ? 'true' : 'false'}`}
          onClick={() => handleCurrentPage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;

        return (
          <li
            className={classNames('page-item', {
              active: currentPage === page,
            })}
            key={i}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handleCurrentPage(page)}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#"
          aria-disabled={`${currentPage === totalPages ? 'true' : 'false'}`}
          onClick={() => handleCurrentPage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
