import React, { BaseSyntheticEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const itemsMax = 42;
const perPageItems = [3, 5, 10, 20];
const items = getNumbers(1, itemsMax)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageItem, setPerPageItem] = useState(5);
  const pages = getNumbers(1, Math.ceil(itemsMax / perPageItem));

  const fromItemValue = (currentPage - 1) * perPageItem;
  const toItemValue = currentPage * perPageItem > itemsMax
    ? itemsMax
    : currentPage * perPageItem;

  const visibleItems = items.slice(fromItemValue, toItemValue);

  function handleItems(event: BaseSyntheticEvent) {
    setPerPageItem(+event.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromItemValue + 1} - ${toItemValue} of ${itemsMax})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageItem}
            onChange={handleItems}
          >
            {perPageItems.map(value => (
              <option
                key={value}
                value={value}
              >
                {value}
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
