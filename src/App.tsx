import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemsList } from './components/ItemsList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const defaultValue = 5;

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(defaultValue);
  const [currentPage, setCurrentPage] = useState(1);

  const total = items.length;

  const startItem: number = (currentPage * itemsPerPage) - itemsPerPage;
  const endItem: number = Math.min(startItem + itemsPerPage, total);

  function handleOnChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${endItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={defaultValue}
            onChange={handleOnChange}
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
        total={total}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ItemsList
        allItems={items}
        start={startItem}
        end={endItem}
      />
    </div>
  );
};

export default App;
