import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import { ItemList } from './components/ItemList';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const totalItems = items.length;

export const App: React.FC = () => {
  const [visiblePages, setVisiblePages] = useState(5);
  const [selectPage, setSelectPage] = useState(1);

  const start = (selectPage * visiblePages) - visiblePages;
  const end = Math.min(start + visiblePages, totalItems);

  const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVisiblePages(+event.target.value);
    setSelectPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page !== selectPage) {
      setSelectPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Item with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectPage} (items ${start + 1} - ${end} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={visiblePages}
            onChange={handleSelectPage}
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
        total={totalItems}
        perPage={visiblePages}
        currentPage={selectPage}
        onPageChange={handlePageChange}
      />

      <ItemList
        start={start}
        end={end}
        items={items}
      />
    </div>
  );
};

export default App;
