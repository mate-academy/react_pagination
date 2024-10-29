import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items : string[] = getNumbers(1, 42).map(n => `Item ${n}`);

enum PerPageOption {
  'three' = 3,
  'five' = 5,
  'ten' = 10,
  'twenty' = 20
}

export const App: React.FC = () => {
  const [perPageSelector, setPerPageSelector] = useState<PerPageOption>(PerPageOption.five);
  const [activePage, setActivePage] = useState<number>(1);

  function handleSelect (e: ChangeEvent<HTMLSelectElement>) {
    setPerPageSelector(+e.currentTarget.value)
    setActivePage(1)
  }

  function changePage (page: number) {
    setActivePage(page);
  }

  const paginationButtonsLength = Math.ceil(items.length / perPageSelector);

  const to = activePage * perPageSelector;
  const from = to - (perPageSelector - 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {activePage} (items {from} - {activePage === paginationButtonsLength ? items.length : to} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={PerPageOption.five}
            onChange = {handleSelect}
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
        buttonsLength={paginationButtonsLength}
        activePage={activePage}
        callback={changePage}
      />
      <ul>
        {items.slice(from - 1, to).map(item =>(
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
