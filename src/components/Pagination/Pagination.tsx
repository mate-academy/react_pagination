import React, { useMemo } from 'react';
import cn from 'classnames';

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
  const totalPages = useMemo(
    () => Math.ceil(total / perPage),
    [total, perPage],
  );

  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = total === 0 ? 0 : Math.min(currentPage * perPage, total);

  // #region handlers

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // #endregion

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    e.preventDefault();
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const pages = useMemo(
    () =>
      total === 0 ? [] : Array.from({ length: totalPages }, (_, i) => i + 1),
    [total, totalPages],
  );

  return (
    <>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {start} - {end} of {total})
      </p>

      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1 || total === 0,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 || total === 0}
            onClick={handlePrev}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            className={cn('page-item', { active: currentPage === page })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => handlePageClick(e, page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === totalPages || total === 0,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages || total === 0}
            onClick={handleNext}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
