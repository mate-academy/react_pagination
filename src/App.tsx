import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import 'bulma/css/bulma.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  // const [currentItems, setCurrentItems] = useState(items);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const lastItemIndex = perPage * currentPage;
  const firstItemIndex = lastItemIndex - perPage;
  const preparedItems = items.slice(firstItemIndex, lastItemIndex);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(+e.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItemIndex + 1} -{' '}
        {lastItemIndex > items.length ? items.length : lastItemIndex} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChange}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
      <ul>
        {preparedItems.map(el => (
          <li key={el} data-cy="item">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
