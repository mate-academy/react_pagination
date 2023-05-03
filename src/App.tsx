import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42);

export const App: React.FC = () => {
  const [countPerPage, setCountPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const firstVisibleItemIndex = (currentPage - 1) * countPerPage;
  const lastItemIndex = firstVisibleItemIndex + countPerPage;
  const lastVisibleItemIndex = lastItemIndex > items.length
    ? items.length
    : lastItemIndex;

  const visibleTtems = items.slice(firstVisibleItemIndex, lastVisibleItemIndex);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstVisibleItemIndex + 1} - ${lastVisibleItemIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChange}
            value={countPerPage}
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
        perPage={countPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleTtems.map(item => (
          <li key={item} data-cy="item">
            {`Item ${item}`}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default App;
