import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const TOTAL_OF_ITEMS = 42;

const options = [3, 5, 10, 20];

const items = getNumbers(1, TOTAL_OF_ITEMS)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleQueryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  let startItemIndex = ((currentPage - 1) * Number(itemsPerPage)) + 1;
  const endItemIndex = Math.min(
    currentPage * Number(itemsPerPage),
    TOTAL_OF_ITEMS,
  );

  const currentItems = items.slice(startItemIndex - 1, endItemIndex);

  if (currentPage === 1) {
    startItemIndex = 1;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItemIndex} - ${endItemIndex} of ${TOTAL_OF_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleQueryChange}
          >
            {options.map(option => {
              return (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL_OF_ITEMS}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {currentItems.map(item => {
          return (
            <li
              key={item}
              data-cy="item"
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
