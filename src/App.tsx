import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(42);

  const items = getNumbers(1, total)
    .map(n => `Item ${n}`);

  // getCurrentItems
  const firstItemIndex = currentPage * itemsPerPage - itemsPerPage;
  const lastItemIndex = currentPage * itemsPerPage <= total
    ? currentPage * itemsPerPage
    : total;

  const currentItems = items.slice(firstItemIndex, lastItemIndex);

  const onPageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => {
              setItemsPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
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
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        setCurrentPage={setCurrentPage}
      />

      <ul>
        {currentItems.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>

        ))}
      </ul>
    </div>
  );
};

export default App;
