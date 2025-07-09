import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
  onPageChange,
}: Props) => {
  const amountAofPages: number = Math.ceil(total / perPage);

  const pages: number[] = Array.from(
    { length: amountAofPages },
    (_, i) => i + 1,
  );

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            currentPage !== 1 && setCurrentPage(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => {
        return (
          <li
            key={page}
            className={classNames('page-item', { active: page === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${currentPage}`}
              onClick={() => {
                page !== currentPage && onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li
        className={classNames('page-item', {
          disabled: currentPage === pages.at(-1),
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.at(-1) ? 'true' : 'false'}
          onClick={() => {
            currentPage !== pages.at(-1) && setCurrentPage(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
