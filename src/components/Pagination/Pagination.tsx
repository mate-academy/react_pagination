import React, { useMemo } from 'react';
import classnames from 'classnames';

type Props = {
  total: number[];
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalResult = total.slice(
    perPage * currentPage - perPage,
    perPage * currentPage,
  );

  const existingPages = total.slice(0, Math.ceil(42 / perPage));

  useMemo(() => onPageChange(total[0]), [perPage]);

  return (
    <>
      <ul className="pagination">
        <li
          className={classnames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {existingPages.map((page) => (
          <li
            key={page}
            className={classnames('page-item', {
              active: currentPage === page,
            })}
            onClick={() => {
              onPageChange(page);
            }}
            aria-hidden="true"
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={classnames('page-item', {
            disabled: currentPage === existingPages.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === existingPages.length}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {totalResult.map((all) => (
          <li data-cy="item" key={all}>
            {`Item ${all}`}
          </li>
        ))}
      </ul>
    </>
  );
};
