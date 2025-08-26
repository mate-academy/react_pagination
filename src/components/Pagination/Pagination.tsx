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
  const pages = Math.max(1, Math.ceil(total / Math.max(1, perPage)));
  const page = Math.min(Math.max(1, currentPage), pages);
  const isFirst = page === 1;
  const isLast = page === pages;

  const go = (p: number) => {
    if (p !== page) {
      onPageChange(p);
    }
  };

  return (
    <ul className="pagination" data-cy="pagination">
      <li className={isFirst ? 'disabled' : ''}>
        <a
          href="#prev"
          data-cy="prevLink"
          aria-disabled={isFirst}
          onClick={e => {
            e.preventDefault();
            if (!isFirst) {
              go(page - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <li key={p} className={p === page ? 'active' : ''}>
          <a
            href={`#${p}`}
            data-cy="pageLink"
            onClick={e => {
              e.preventDefault();
              go(p);
            }}
          >
            {p}
          </a>
        </li>
      ))}

      <li className={isLast ? 'disabled' : ''}>
        <a
          href="#next"
          data-cy="nextLink"
          aria-disabled={isLast}
          onClick={e => {
            e.preventDefault();
            if (!isLast) {
              go(page + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
