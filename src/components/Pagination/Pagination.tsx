import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const currentPerPageArray = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, i) => i + 1,
  );

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {currentPerPageArray.map(page => {
        return (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            className={classNames('page-item', {
              active: currentPage === page,
            })}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={classNames('page-item', {
          disabled: currentPage === Math.ceil(total / perPage),
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === Math.ceil(total / perPage)}
          onClick={() => {
            if (currentPage < Math.ceil(total / perPage)) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
