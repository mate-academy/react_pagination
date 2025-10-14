import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  totalPages: externalTotalPages,
  onPageChange,
  onPerPageChange,
}) => {
  // всегда пересчитываем корректно
  const computedTotalPages =
    typeof externalTotalPages === 'number'
      ? externalTotalPages
      : Math.ceil(total / perPage);

  const safeCurrent = clamp(currentPage, 1, Math.max(computedTotalPages, 1));

  const prevDisabled = computedTotalPages === 0 || safeCurrent <= 1;
  const nextDisabled =
    computedTotalPages === 0 || safeCurrent >= computedTotalPages;

  const pages =
    computedTotalPages > 0
      ? Array.from({ length: computedTotalPages }, (_, i) => i + 1)
      : [];

  const firstItem = total === 0 ? 0 : (safeCurrent - 1) * perPage + 1;
  const lastItem = total === 0 ? 0 : Math.min(safeCurrent * perPage, total);
  const infoText = `Page ${safeCurrent} (items ${firstItem} - ${lastItem} of ${total})`;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (prevDisabled) {
      return;
    }

    onPageChange(safeCurrent - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (nextDisabled) {
      return;
    }

    onPageChange(safeCurrent + 1);
  };

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page === safeCurrent || computedTotalPages === 0) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="pagination-wrapper">
      <div className="form-group row align-items-center">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              const val = Number(e.target.value);

              if (!Number.isNaN(val) && val > 0) {
                onPerPageChange(val);
              }
            }}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <p className="lead" data-cy="info">
        {infoText}
      </p>

      <ul className="pagination">
        <li className={`page-item ${prevDisabled ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={prevDisabled ? 'true' : 'false'}
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
              className="page-link"
              href={`#${page}`}
              onClick={e => handlePageClick(e, page)}
              aria-current={page === safeCurrent ? 'page' : undefined}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={`page-item ${nextDisabled ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={nextDisabled ? 'true' : 'false'}
            onClick={handleNext}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
