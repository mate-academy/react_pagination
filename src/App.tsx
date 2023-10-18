import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList/ItemList';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const SELECT_OPTIONS = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const lastItemOnPage = currentPage * perPage;
  const firstItemOnPage = lastItemOnPage - perPage;

  const itemsToDisplay = items.slice(firstItemOnPage, lastItemOnPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage + 1} - ${Math.min(lastItemOnPage, items.length)} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => setPerPage(Number(e.target.value))}
            defaultValue={perPage}
          >
            {SELECT_OPTIONS.map((optionValue) => (
              <option
                value={optionValue}
                key={optionValue}
              >
                {optionValue}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        total={items.length}
        onPageChange={setCurrentPage}
      />

      <ItemList
        list={itemsToDisplay}
      />
    </div>
  );
};

export default App;
