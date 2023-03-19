import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const PER_PAGE_SELECTOR = [3, 5, 10, 20];
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selectValue, setSelectValue] = useState(PER_PAGE_SELECTOR[1]);
  const [currentValue, setCurrentValue] = useState(1);

  const total = items.length;

  const visibleItems = items.slice(
    (currentValue - 1) * selectValue, currentValue * selectValue,
  );

  const firstItem = items.indexOf(visibleItems[0]) + 1;
  const lastItem = items.indexOf(visibleItems[visibleItems.length - 1]) + 1;

  const hendlerSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(+event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentValue} (items ${firstItem} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectValue}
            onChange={hendlerSelect}
          >

            <option value={PER_PAGE_SELECTOR[0]}>{PER_PAGE_SELECTOR[0]}</option>
            <option value={PER_PAGE_SELECTOR[1]}>{PER_PAGE_SELECTOR[1]}</option>
            <option value={PER_PAGE_SELECTOR[2]}>{PER_PAGE_SELECTOR[2]}</option>
            <option value={PER_PAGE_SELECTOR[3]}>{PER_PAGE_SELECTOR[3]}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={selectValue}
        currentPage={currentValue}
        onPageChange={setCurrentValue}
      />

      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
