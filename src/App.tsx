import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { getUrlNumericValue } from './helpers/getUrlNumericValue';
import {
  ITEMS_PER_PAGE_DEFAULT,
  PAGE_NUMBER_DEFAULT,
} from './variables/constants';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

const perPageOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(
    getUrlNumericValue('perPage', ITEMS_PER_PAGE_DEFAULT),
  );
  const [currentPage, setCurrentPage] = useState(
    getUrlNumericValue('page', PAGE_NUMBER_DEFAULT),
  );

  const itemsCount = items.length;

  const firstIndex = perPage * (currentPage - 1);
  const lastIndex = firstIndex + perPage;
  const displayedItems = items.slice(firstIndex, lastIndex);

  // cosmetic value for range
  const firstN = firstIndex + 1;
  const lastN = Math.min(lastIndex, itemsCount);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (quantity: number) => {
    setPerPage(quantity);
    setCurrentPage(PAGE_NUMBER_DEFAULT);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstN} - {lastN} of {itemsCount})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => handlePerPageChange(+event.target.value)}
          >
            {perPageOptions.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={itemsCount}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          if (page !== currentPage) {
            handlePageChange(page as number);
          }
        }}
      />
      <ul>
        {displayedItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
