import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (arg0: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = [];
  const pagesCount = Math.ceil(total / perPage);

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(
      <li
        className={classNames('page-item', currentPage === i ? 'active' : '')}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </a>
      </li>,
    );
  }

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', currentPage === 1 ? 'disabled' : '')}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages}
      <li
        className={classNames(
          'page-item',
          currentPage === pagesCount ? 'disabled' : '',
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== pagesCount) {
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
