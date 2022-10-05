/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, changeCurrentPage] = useState(1);
  const [perPage, addPerPage] = useState(5);
  const pages = Math.ceil(items.length / perPage);

  const onPageChange = (number: number) => {
    changeCurrentPage(number);
  };

  const showItems = (values: string[] | number[]) => {
    let v = values.slice(0, currentPage - 1);

    if (currentPage < pages) {
      v = values.slice((currentPage - 1) * perPage, perPage * currentPage);
    }

    if (currentPage === pages) {
      v = values.slice((currentPage - 1) * perPage, values.length);
    }

    return v;
  };

  const visibleItems = showItems(items);
  const itemsFromTo = showItems(getNumbers(1, items.length));
  const firstNumber = itemsFromTo[0];
  const lastNumber = itemsFromTo[itemsFromTo.length - 1];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstNumber} - ${lastNumber} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => {
              addPerPage(Number(e.target.value));
              changeCurrentPage(1);
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

      <Pagination
        total={items.length} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={onPageChange}
      />
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
