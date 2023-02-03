import React, { ChangeEvent, useState } from 'react';

import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const itemsPerPageSelect = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const itemsNum = items.length;

  const startItemNumber = itemsPerPage * (currentPage - 1) + 1;
  const possibleEndItem = itemsPerPage * currentPage;
  const endItemNumber = possibleEndItem <= itemsNum
    ? possibleEndItem
    : itemsNum;

  const visibleItems = items.slice(
    startItemNumber - 1,
    endItemNumber,
  );

  const onItemsNumChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItemNumber} - ${endItemNumber} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={onItemsNumChange}
          >
            {itemsPerPageSelect.map(itemsAmount => (
              <option value={itemsAmount}>
                {itemsAmount}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={itemsNum}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
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
