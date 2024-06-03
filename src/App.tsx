import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [numberItems, setNumberItems] = useState(5);
  const pages: number[] = getNumbers(1, Math.ceil(42 / numberItems));
  const [activePage, setActivePage] = useState(pages[0]);
  const activeIndex = pages.indexOf(activePage);
  const fromIndex = activeIndex * numberItems;
  const toIndex = fromIndex + numberItems <= 42 ? fromIndex + numberItems : 42;
  const visibleItems = items.slice(fromIndex, toIndex);

  const handleNumberItemsChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setNumberItems(+event.target.value);
    setActivePage(pages[0]);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {activePage} (items {fromIndex + 1} - {toIndex} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleNumberItemsChange}
          >
            <option value="3">3</option>
            <option selected value="5">
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

      {/* Move this markup to Pagination */}
      <Pagination
        pages={pages}
        activePage={activePage}
        onChangeActivePage={setActivePage}
        activeIndex={activeIndex}
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
