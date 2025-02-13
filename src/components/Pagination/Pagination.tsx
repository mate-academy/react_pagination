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
  const totalPag: number = Math.ceil(total / perPage);
  const pages: number[] = Array.from({ length: totalPag }, (_, i) => i + 1);
  let pag = currentPage;

  if (pag > pages.length || pag <= 0) {
    pag = 1;
  }

  return (
    <ul className="pagination">
      <li className={`page-item${pag === 1 ? ' disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          aria-disabled={pag === 1}
          href="#next"
          onClick={() => {
            if (pag > 1) {
              onPageChange(pag - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(p => (
        <li className={`page-item${p == pag ? ' active' : ''}`} key={p}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${p}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </a>
        </li>
      ))}

      <li className={`page-item${pag === pages.length ? ' disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          aria-disabled={pag === pages.length}
          href="#prev"
          onClick={() => {
            if (pag !== pages.length) {
              onPageChange(pag + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
