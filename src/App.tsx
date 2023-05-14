import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const displayedItems = items.slice(
    itemsPerPage * (currentPage - 1),
    itemsPerPage * (currentPage),
  );
  const firstItem = displayedItems[0];
  const lastItem = displayedItems[displayedItems.length - 1];

  const handleItemsAmountPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const options = [3, 5, 10, 20];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem.split(' ').slice(1)} - ${lastItem.split(' ').slice(1)} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsAmountPerPage}
          >
            {options.map((option) => {
              return (
                <option
                  value={option}
                  key={option}
                  selected={option === itemsPerPage}
                >
                  {option}
                </option>
              );
            })}
            ;
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {displayedItems.map(n => (
          <li
            data-cy="item"
            key={`${n}`}
          >
            {`${n}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
