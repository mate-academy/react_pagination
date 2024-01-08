import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const total = items.length;

export const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [countItem, setCountItem] = useState<number>(5);

  const pageChange = ((page: number) => {
    setSelectedPage(page);
  });

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountItem(Number(event.target.value));
    setSelectedPage(1);
  };

  const selectElements = (selectedPage - 1) * countItem + 1;
  const countPages = Math.min(selectedPage * countItem, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${selectElements} - ${countPages} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
            value={countItem}
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
        items={items}
        total={total}
        perPage={countItem}
        currentPage={selectedPage}
        onPageChange={pageChange}
      />
    </div>
  );
};

export default App;
