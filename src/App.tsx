import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const perPageOptions = [3, 5, 10, 20] as const;

  type PerPageType = (typeof perPageOptions)[number];
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromURL = Number(searchParams.get('page')) || 1;
  const perPageFromURL = Number(searchParams.get('perPage')) || 5;
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const [elementsPerPage, setElementsPerPage] = useState<PerPageType>(perPageFromURL as PerPageType);
  const firstItemOnPage = elementsPerPage * (currentPage - 1);
  const startItem = firstItemOnPage + 1;
  const endItem = Math.min(firstItemOnPage + elementsPerPage, items.length);

  const visibleItems = items.slice(
    firstItemOnPage,
    firstItemOnPage + elementsPerPage,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={elementsPerPage}
            onChange={e => {
              setElementsPerPage(Number(e.target.value) as PerPageType);
              setCurrentPage(1);
              setSearchParams({
                page: '1',
                perPage: e.target.value,
              });
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
          >
            {perPageOptions.map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        perPage={elementsPerPage}
        currentPage={currentPage}
        total={items.length}
        onPageChange={(page) => {
          setCurrentPage(page);
          setSearchParams({
            page: page.toString(),
            perPage: elementsPerPage.toString(),
          });
        }}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
