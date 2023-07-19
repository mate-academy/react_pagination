import React, { useState } from 'react';
import './App.css';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsStartRange = (
    (currentPage * itemsOnPage) - (itemsOnPage - 1)
  );

  const itemsEndRange = Math.min(
    currentPage * itemsOnPage, items.length,
  );

  const onSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsOnPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsStartRange} - ${itemsEndRange} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={itemsOnPage}
            onChange={onSelectChange}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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
        total={items.length}
        items={items}
        perPage={itemsOnPage}
        currentPage={currentPage}
        itemsStartRange={itemsStartRange}
        itemsEndRange={itemsEndRange}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
