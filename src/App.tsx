import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPager, setPerPager] = useState(5);
  const [currentPage, onPageChange] = useState(1);
  const itemOnPage = items.slice(
    currentPage * perPager - perPager,
    currentPage * perPager,
  );
  const maxItems =
    currentPage * perPager < items.length
      ? currentPage * perPager
      : items.length;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${currentPage * perPager + 1 - perPager} - ${maxItems} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              setPerPager(parseInt(e.target.value));
              if (currentPage !== 1) {
                onPageChange(1);
              }
            }}
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
        perPage={perPager}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {itemOnPage.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
