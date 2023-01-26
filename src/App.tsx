import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const pageSelectors = [
  { itemsPerPage: '3', id: 'select-1' },
  { itemsPerPage: '5', id: 'select-2' },
  { itemsPerPage: '10', id: 'select-3' },
  { itemsPerPage: '20', id: 'select-4' },
];

export const App: React.FC = () => {
  const [selectedSelectorId, setSelectedSelectorId] = useState('select-2');

  const selectedSelector = pageSelectors.find((selector) => (
    setSelectedSelectorId(selector.id)
  ));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page 1 (items 1 - ${selectedSelector} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedSelectorId}
            onChange={((event) => {
              setSelectedSelectorId(event.target.value);
            })}
          >
            {pageSelectors.map((selector) => (
              <option
                value={selector.id}
                key={selector.id}
              >
                {selector.itemsPerPage}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        items={items}
      />
      {/* total={42}
      perPage={5}
      currentPage={1}
      onPageChange={() => { }} */}
    </div>
  );
};

export default App;
