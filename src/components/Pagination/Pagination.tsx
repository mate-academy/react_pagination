import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (n: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const raw = currentPage ?? 1;
  const page = totalPages === 0 ? 1 : Math.min(Math.max(1, raw), totalPages);
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div>
      <p className="lead" data-cy="info">
        Page {page} (items {start} - {end} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              const val = Number(e.target.value);

              onPerPageChange?.(val);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <ul className="pagination">
        <li className={cn('page-item', { disabled: prevDisabled })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={prevDisabled}
            onClick={e => {
              e.preventDefault();
              if (!prevDisabled) {
                onPageChange(page - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i} className={cn('page-item', { active: i + 1 === page })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={e => {
                e.preventDefault();
                if (i + 1 !== page) {
                  onPageChange(i + 1);
                }
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}

        <li className={cn('page-item', { disabled: nextDisabled })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={nextDisabled}
            onClick={e => {
              e.preventDefault();
              if (!nextDisabled) {
                onPageChange(page + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
