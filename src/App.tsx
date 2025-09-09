import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const total = items.length;
  const pagesCount = Math.ceil(total / perPage);

  const currentPageClamped =
    pagesCount === 0 ? 1 : Math.min(Math.max(1, currentPage), pagesCount);

  const sliceStart = pagesCount === 0 ? 0 : (currentPageClamped - 1) * perPage;
  const sliceEnd = Math.min(currentPageClamped * perPage, total);

  const first = total === 0 ? 0 : sliceStart + 1;
  const last = total === 0 ? 0 : sliceEnd;

  const currentItems = items.slice(sliceStart, sliceEnd);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(+event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPageClamped} (items {first} - {last} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            onChange={handleSelectChange}
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
        onPageChange={setCurrentPage}
        currentPage={currentPageClamped}
        perPage={perPage}
        total={total}
      />

      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
