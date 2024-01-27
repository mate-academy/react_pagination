import './App.css';

import React, { useContext } from 'react';
import { Pagination } from './components/Pagination';
import { PageContext } from './PageContext/PageContext';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const {
    total,
    currentPage,
    startIndex,
    endIndex,
    setTotal,
    setItemsPerPage,
  } = useContext(PageContext);

  setTotal(items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items 1 - 5 of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue={5}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => setItemsPerPage(+event.target.value)}
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

      <Pagination items={items} />

      <ul>
        {items.slice(startIndex, endIndex).map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
