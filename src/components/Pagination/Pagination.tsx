import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (newPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={event => {
            event.preventDefault();

            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((el: number) => (
        <li
          key={el}
          className={classNames('page-item', { active: el === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${el}`}
            onClick={event => {
              event.preventDefault();

              if (el !== currentPage) {
                onPageChange(el);
              }
            }}
          >
            {el}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={event => {
            event.preventDefault();

            if (currentPage < totalPages) {
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
