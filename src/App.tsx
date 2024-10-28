import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const allItems = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [amounts, setAmount] = useState<number>(5);
  const [pages, setPage] = useState<number>(1);

  const getVisibleItem = (items: string[], amount: number, page: number) => {
    const start = (page - 1) * amount;

    return items.slice(start, start + amount);
  };

  const visibleItem = getVisibleItem(allItems, amounts, pages);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = (event.target as HTMLSelectElement).value;

    setAmount(Number(selectedValue));

    setPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {pages} (items {(pages - 1) * amounts + 1} -{' '}
        {Math.min(pages * amounts, allItems.length)} of {allItems.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={amounts}
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
        total={allItems.length}
        perPage={amounts}
        currentPage={pages}
        onPageChange={setPage}
      />
      <ul>
        {visibleItem.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
