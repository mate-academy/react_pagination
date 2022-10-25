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
  currentPage,
  onPageChange,
}) => {
  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          {
            disabled: currentPage === 0,
          },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 0}
            onClick={() => {
              if (currentPage !== 0) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {Array(Math.ceil(total / perPage))
          .fill(null)
          .map((_, idx) => (
            <li
              className={classNames(
                'page-item',
                {
                  active: currentPage === idx,
                },
              )}
              key={Math.random().toString().slice(-8)}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${idx + 1}`}
                onClick={() => onPageChange(idx)}
              >
                {idx + 1}
              </a>
            </li>
          ))}
        <li className={classNames(
          'page-item',
          {
            disabled: currentPage === Math.ceil(total / perPage) - 1,
          },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === (Math.ceil(total / perPage) - 1)}
            onClick={() => {
              if (currentPage !== (Math.ceil(total / perPage) - 1)) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {Array(perPage)
          .fill(null)
          .map((_, idx) => (
            <li
              data-cy="item"
              key={`item ${Math.random().toString().slice(-4)}`}
            >
              {`Item ${currentPage * perPage + idx + 1}`}
            </li>
          )).filter((_, idx) => currentPage * perPage + idx < total)}
      </ul>
    </>
  );
};
