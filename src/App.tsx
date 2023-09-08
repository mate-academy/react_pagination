import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
const showItemsPerPage = [3, 5, 10, 20];
const DEFAULT_PER_PAGE = showItemsPerPage[1];

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const startIndex = currentPage * itemsPerPage - itemsPerPage + 1;
  const lastIndex = Math.min(currentPage * itemsPerPage, TOTAL_ITEMS);
  const itemsForPage = getNumbers(startIndex, lastIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex} - ${lastIndex} of ${TOTAL_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handlePerPageChange}
          >
            {showItemsPerPage.map(number => (
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
        total={TOTAL_ITEMS}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <ul>
        {itemsForPage.map(item => (
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
