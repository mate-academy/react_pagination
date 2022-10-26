import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const minNumber = 1;
const maxNumber = 42;
const items = getNumbers(minNumber, maxNumber)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(minNumber);
  const firstItem = (currentPage - 1) * itemsOnPage;
  const lastItem = ((currentPage * itemsOnPage) < maxNumber)
    ? currentPage * itemsOnPage
    : maxNumber;
  const visibleItems = items.slice(firstItem, lastItem);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(minNumber);
    setItemsOnPage(+event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${maxNumber})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsOnPage}
            onChange={handleChange}
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
        total={42}
        perPage={itemsOnPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
