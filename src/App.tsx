import React, { useState } from 'react';
// import './App.css';
import { Pagination } from './components/Pagination';
import { SelectOptions, getNumbers } from './utils';

export const App = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);

  let itemsEnd: number = itemsPerPage * pageIndex;
  const itemsStart: number = itemsEnd - (itemsPerPage - 1);
  const itemCount = 42;
  const pageCount: number = Math.ceil(itemCount / itemsPerPage) + 1;

  if (itemsEnd > itemCount) {
    itemsEnd = itemCount;
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.currentTarget.value, 10));
    setPageIndex(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pageIndex} (items ${itemsStart} - ${itemsEnd} of ${itemCount})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelect}
            defaultValue={5}
          >
            {Object.values(SelectOptions)
              .filter(value => typeof value === 'number')
              .map(el => (
                <option value={el}>{el}</option>
              ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        pageCount={pageCount}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
      <ul>
        {getNumbers(itemsStart, itemsEnd + 1).map(n => (
          <li data-cy="item">Item {n}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
