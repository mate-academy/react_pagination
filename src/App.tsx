import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  function handleChnage(event: ChangeEvent<HTMLSelectElement>) {
    setCurrentPage(1);
    setPerPage(parseInt(event.target.value, 10));
  }

  const firstIndex = (currentPage - 1) * perPage;
  const lastIndex = firstIndex + perPage;

  const elementsPerPage = items.slice(firstIndex, lastIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstIndex + 1} - ${firstIndex + elementsPerPage.length} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChnage}
          >
            <option value="3">3</option>
            <option value="5" selected>5</option>
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ul>
        {elementsPerPage.map((item) => (
          <li data-cy="item" key={item}>{`${item}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
