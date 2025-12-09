import React from 'react';
import './App.css';
import { getNumbers } from './utils';

// generate items (1..42)
const items = getNumbers(1, 42).map(n => `Item ${n}`);

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

/**
 * Stateless Pagination component.
 * Keeps the HTML structure with .page-item/.page-link and data-cy attributes
 */
const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const safeCurrent = Math.min(Math.max(1, currentPage), pageCount);

  const goTo = (page: number) => {
    if (page === safeCurrent) {
      return;
    } // trigger only if changed

    if (page < 1 || page > pageCount) {
      return;
    }

    onPageChange(page);
  };

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <ul className="pagination" data-cy="pagination">
      <li className={`page-item ${safeCurrent === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={safeCurrent === 1 ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            goTo(safeCurrent - 1);
          }}
        >
          «
        </a>
      </li>

      {pages.map(p => (
        <li
          key={p}
          className={`page-item ${p === safeCurrent ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${p}`}
            onClick={e => {
              e.preventDefault();
              goTo(p);
            }}
          >
            {p}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${safeCurrent === pageCount ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={safeCurrent === pageCount ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            goTo(safeCurrent + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export const App: React.FC = () => {
  const TOTAL = items.length;

  // local state: perPage and currentPage
  const [perPage, setPerPage] = React.useState<number>(5);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // compute pageCount and clamp currentPage
  const pageCount = Math.max(1, Math.ceil(TOTAL / perPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), pageCount);

  // compute visible items
  const startIndex = (safeCurrentPage - 1) * perPage;
  const endIndex = Math.min(TOTAL, safeCurrentPage * perPage);
  const visibleItems = items.slice(startIndex, endIndex);

  // handle page change from Pagination component
  const handlePageChange = (page: number) => {
    if (page === currentPage) {
      return;
    } // only if changed

    setCurrentPage(page);
  };

  // handle perPage selector change — show page 1 after change
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value) || 5;

    if (newPerPage === perPage) {
      return;
    }

    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${safeCurrentPage} (items ${TOTAL === 0 ? 0 : startIndex + 1} - ${endIndex} of ${TOTAL})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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

      <ul>
        {visibleItems.map(it => (
          <li key={it} data-cy="item">
            {it}
          </li>
        ))}
      </ul>

      <Pagination
        total={TOTAL}
        perPage={perPage}
        currentPage={safeCurrentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
