import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const onSetPage = (currentPage: number) => {
    setPage(currentPage);
  };

  const startItemPerPage = (page - 1) * itemsPerPage;
  const visibleItems = [...items].splice(startItemPerPage, itemsPerPage);
  const from = startItemPerPage + 1;
  const to = startItemPerPage + itemsPerPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${from} - ${to > 42 ? 42 : to} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(+e.target.value);
              setPage(1);
            }}
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
        currentPage={page}
        itemsPerPage={itemsPerPage}
        onSetPage={onSetPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
