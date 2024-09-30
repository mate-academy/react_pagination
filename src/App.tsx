import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selectedPerPageValue, setSelectedPerPageValue] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPerPageValue(Number(event.target.value));
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * selectedPerPageValue;
  const indexOfFirstItem = indexOfLastItem - selectedPerPageValue;

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const itemFrom = indexOfFirstItem + 1;
  const itemTo = Math.min(indexOfLastItem, items.length);

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
            onChange={handlePerPageChange}
            defaultValue={selectedPerPageValue}
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
