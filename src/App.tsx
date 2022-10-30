import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { ItemsList } from './components/ItemsList';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => ({
    title: `Item ${n}`,
    id: n,
  }));

export const App: React.FC = () => {
  const [countPerPage, setCountPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const total = items.length;

  const startingItem = (currentPage - 1) * countPerPage;
  const endingItem = Math.min(startingItem + countPerPage, items.length);

  const currentItems = items.slice(startingItem, endingItem);

  const handleCountPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startingItem + 1} - ${endingItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={countPerPage}
            onChange={handleCountPerPage}
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
        perPage={countPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ItemsList items={currentItems} />
    </div>
  );
};

export default App;
