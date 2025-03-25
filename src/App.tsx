import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

enum ItemsPerPage {
  items3 = 3,
  items5 = 5,
  items10 = 10,
  items20 = 20,
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<ItemsPerPage>(ItemsPerPage.items5);
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} -{' '}
        {Math.min(currentPage * perPage, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={ItemsPerPage.items5.toString()}
            onChange={ev => {
              const selectedValue: ItemsPerPage = +ev.target.value;

              setPerPage(selectedValue);
              setCurrentPage(1);
            }}
          >
            <option value={ItemsPerPage.items3}>3</option>
            <option value={ItemsPerPage.items5}>5</option>
            <option value={ItemsPerPage.items10}>10</option>
            <option value={ItemsPerPage.items20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
