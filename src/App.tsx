import React, { useState } from 'react';
import './App.css';
import { getNumbers, getRandomNumber } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_PAGES = 42;
const items = getNumbers(1, TOTAL_PAGES)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const startItem = itemsPerPage * (currentPage - 1);
  const startItemInfo = 1 + startItem;
  const endItem = currentPage * itemsPerPage;
  const endItemInfo = endItem > TOTAL_PAGES ? TOTAL_PAGES : endItem;

  const handleItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItemInfo} - ${endItemInfo} of ${TOTAL_PAGES})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPage}
          >
            {[3, 5, 10, 20].map(num => (
              <option value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL_PAGES}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {items.slice(startItem, endItem)
          .map(item => (
            <li
              data-cy="item"
              key={getRandomNumber()}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
