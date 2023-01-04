import React, { useEffect } from 'react';
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
  const totalStart = perPage * currentPage - perPage;
  const totalEnd = perPage * currentPage;

  const totalResult = total.slice(totalStart, totalEnd);

  const existingPages = total.slice(0, Math.ceil(42 / perPage));

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === existingPages.length;

  useEffect(() => onPageChange(total[0]), [perPage]);

  return (
    <>
      <ul className="pagination">
        <li
          className={classnames('page-item', {
            disabled: isFirstPage,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
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
            disabled: isLastPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
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
