import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const totalItems = items.length;

export const App: React.FC = () => {
  const [visiblePages, setVisiblePages] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const start = (selectedPage * visiblePages) - visiblePages;
  const end = Math.min(start + visiblePages, totalItems);

  const handleSelectedPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVisiblePages(+event.target.value);
    setSelectedPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page !== selectedPage) {
      setSelectedPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${start + 1} - ${end} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={visiblePages}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectedPage}
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
        currentPage={selectedPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {items
          .slice(start, end)
          .map(item => (
            <li
              key={item}
              data-cy="item"
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
