import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

function takeOnlyNumber(string: string) {
  return +string.replace(/[^0-9]/g, '');
}

const numbers = items.map(item => takeOnlyNumber(item));

export const App: React.FC = () => {
  const [currentPage, changePage] = useState(1);
  const [perPage, changePerPage] = useState(5);

  const visibleItems = [...items]
    .filter((item, index) => {
      if (numbers[index] <= currentPage * perPage
        && numbers[index] > currentPage * perPage - perPage) {
        return (
          item
        );
      }

      return null;
    });

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${takeOnlyNumber(visibleItems[0])} - ${takeOnlyNumber(visibleItems[visibleItems.length - 1])} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => {
              changePage(1);
              changePerPage(+event.target.value);
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => changePage(page)}
      />
      <ul>
        {visibleItems
          .map((item) => (
            <li data-cy="item" key={item}>{item}</li>
          ))}
      </ul>
    </div>
  );
};

export default App;
