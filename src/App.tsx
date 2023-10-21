import React, { BaseSyntheticEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const itemsMax = 42;
const perPageValues = [3, 5, 10, 20];
const items = getNumbers(1, itemsMax)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageValue, setPerPageValue] = useState(5);
  const pages = getNumbers(1, Math.ceil(itemsMax / perPageValue));

  const fromItemOnPage = (currentPage - 1) * perPageValue;
  const tillItemOnPage = currentPage * perPageValue;
  const visibleItems = items.slice(fromItemOnPage, tillItemOnPage);

  // тип е
  function handlePerPageValue(e: BaseSyntheticEvent) {
    setPerPageValue(+e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromItemOnPage + 1} - ${tillItemOnPage} of ${itemsMax})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageValue}
            onChange={handlePerPageValue}
          >
            {perPageValues.map(val => (
              <option
                key={val}
                value={val}
              >
                {val}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
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
