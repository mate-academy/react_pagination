import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const total = items.length;

export const App: React.FC = () => {
  const [selectPages, setPages] = useState<number>(1);
  const [countItems, setItems] = useState<number>(5);

  const handlePerPageChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setItems(Number(event.target.value));
    setPages(1);
  };

  const onPageChange = (page:number) => {
    setPages(page);
  };

  const selectElements = (selectPages - 1) * countItems + 1;
  const countPages = Math.min(selectPages * countItems, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectPages} (items ${selectElements} - ${countPages} of ${total})`}
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
            value={countItems}
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
        perPage={countItems}
        currentPage={selectPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default App;
