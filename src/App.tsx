import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [countOfPages, setCountOfPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const total = items.length;
  const perPage = Math.ceil(items.length / countOfPages);
  const lastIndex = currentPage * countOfPages;
  const firstIndex = lastIndex - countOfPages;
  const pageNumbers = items.slice(firstIndex, lastIndex);
  const infoPage = `Page ${currentPage} (items ${firstIndex + 1} - ${lastIndex < items.length ? lastIndex : items.length} of ${total})`;

  useEffect(() => {
    setCurrentPage(1);
  }, [countOfPages]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        {infoPage}
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => setCountOfPages(parseInt(e.target.value))}
            value={countOfPages}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {pageNumbers.map((pageNumber, i) => (
          <li data-cy="item" key={i}>
            {pageNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
