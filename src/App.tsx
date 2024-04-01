import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import { ItemList } from './components/ItemList';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [split, setSplit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const total = items.length;

  const pageFrom = split * (currentPage - 1);
  const pageTo = split * currentPage;
  const visibleItems = [...items].slice(pageFrom, pageTo);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setSplit(parseInt(event.currentTarget.value));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {pageFrom + 1} -{' '}
        {visibleItems.length !== split ? total : pageTo} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={split}
            onChange={handleChange}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={split}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        items={items}
      />

      <ItemList visibleItems={visibleItems} />
    </div>
  );
};

export default App;
