import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const TOTAL = 42;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(Number('5'));

  const numericPerPage = Number(perPage);
  const endtems = currentPage * numericPerPage;
  const startItems = endtems - numericPerPage;

  const realEndItem = Math.min(endtems, TOTAL);
  const realStartItem = startItems + 1;

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${realStartItem} - ${realEndItem} of ${TOTAL})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
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

      <Pagination
        total={TOTAL} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Move this markup to Pagination
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>

        {pageNumbers.map(pageNumber => (
          <li
            className={cn('page-item', { active: currentPage === pageNumber })}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={e => {
                e.preventDefault();
                handlePageChange(pageNumber);
              }}
            >
              {pageNumber}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', { disabled: currentPage === totalPages })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul> */}

      <ul>
        {items.slice(startItems, endtems).map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
