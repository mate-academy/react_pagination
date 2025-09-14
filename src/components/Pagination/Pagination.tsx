import classNa from 'classnames';
import React from 'react';

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const safePerPage = perPage > 0 ? perPage : 1;
  const pageCount = Math.ceil(total / safePerPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={classNa('page-item', { disabled: currentPage === 1 })}>
        <a
          onClick={e => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            } else {
              e.preventDefault();
            }
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage !== 1 ? 'false' : 'true'}
        >
          «
        </a>
      </li>
      {pages.map((count, index) => (
        <li
          key={count}
          className={classNa('page-item', {
            active: currentPage === count,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${index}`}
            onClick={() => onPageChange(index + 1)}
          >
            {count}
          </a>
        </li>
      ))}
      <li
        className={classNa('page-item', {
          disabled: currentPage >= pages.length,
        })}
      >
        <a
          data-cy="nextLink"
          onClick={e => {
            if (currentPage < pages.length) {
              onPageChange(currentPage + 1);
            } else {
              e.preventDefault();
            }
          }}
          className="page-link"
          href="#next"
          aria-disabled={currentPage < pages.length ? 'false' : 'true'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
