import React, { useState } from 'react';
import './App.css';
import { getNumbers, PER_PAGE } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selectedPerPageValue, setSelectedPerPageValue] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPerPageValue(Number(event.target.value));
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const indexOfLastItem = currentPage * selectedPerPageValue;
  const indexOfFirstItem = indexOfLastItem - selectedPerPageValue;

  const itemFrom = indexOfFirstItem + 1;
  const itemTo = Math.min(indexOfLastItem, items.length);

  const currentItems = getNumbers(itemFrom, itemTo).map(n => `Item ${n}`);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemFrom} - {itemTo} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedPerPageValue}
            onChange={handlePerPageChange}
          >
            {PER_PAGE.map(number => (
              <option value={number} key={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={selectedPerPageValue}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
