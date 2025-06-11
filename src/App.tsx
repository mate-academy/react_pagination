import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const itemsFromServer = getNumbers(1, 42).map(n => `Item ${n}`);

const getVisibleItemsList = (
  items: string[],
  perPage: number,
  selectedPage: number,
) => {
  const start = (selectedPage - 1) * perPage;
  const end = start + perPage;

  return items.slice(start, end);
};

export const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const visibleItems: string[] = getVisibleItemsList(
    itemsFromServer,
    perPage,
    selectedPage,
  );
  const start: number = (selectedPage - 1) * perPage + 1;
  const end: number = Math.min(selectedPage * perPage, itemsFromServer.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {selectedPage} (items {start} - {end} of {itemsFromServer.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPage(+event.target.value);
              setSelectedPage(1);
            }}
            value={perPage}
          >
            <option value="3">3</option>
            <option value="5">
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={itemsFromServer.length}
        perPage={perPage}
        currentPage={selectedPage}
        onPageChange={setSelectedPage}
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
