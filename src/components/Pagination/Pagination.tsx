import React from 'react';
type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safeCurrent = Math.max(1, Math.min(currentPage, totalPages));
  const start = total === 0 ? 0 : (safeCurrent - 1) * perPage + 1;
  const end = Math.min(total, safeCurrent * perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prevDisabled = safeCurrent <= 1;
  const nextDisabled = safeCurrent >= totalPages;
  const handlePrev = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!prevDisabled) {
      onPageChange(safeCurrent - 1);
    }
  };

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!nextDisabled) {
      onPageChange(safeCurrent + 1);
    }
  };

  return (
    <>
      <p className="lead" data-cy="info">
        {`Page ${safeCurrent} (items ${start} - ${end} of ${total})`}
      </p>
      <ul className="pagination">
        <li className={`page-item ${prevDisabled ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            href="#prev"
            className="page-link"
            aria-disabled={prevDisabled}
            onClick={handlePrev}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${page === safeCurrent ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              href={`#${page}`}
              className="page-link"
              onClick={e => {
                e.preventDefault();
                if (page !== safeCurrent) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item ${nextDisabled ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            href="#next"
            className="page-link"
            aria-disabled={nextDisabled}
            onClick={handleNext}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
