import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const maxPerPage = page * perPage > items.length
    ? items.length
    : (page * perPage);

  const firstItem = maxPerPage
  - (maxPerPage - ((page - 1) * perPage));

  const currentItems = items.slice(firstItem, maxPerPage);

  const handleSelect = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${firstItem + 1} - ${maxPerPage} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelect}
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
        total={(items.length)}
        perPage={perPage}
        currentPage={page}
        onPageChange={setPage}
      />

      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
