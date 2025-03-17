import React, { useState, ChangeEvent } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';

import { getNumbers } from './utils';

import { Page } from './types/page';
import { Item } from './types/item';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const ItemsPerPageOptions = {
  THREE: 3,
  FIVE: 5,
  TEN: 10,
  FIFTEEN: 15,
  TWENTY: 20,
};

export const App: React.FC = () => {
  const allItems = [...items];
  const [itemsPerPage, setItemsPerPage] = useState(ItemsPerPageOptions.FIVE);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (page: Page) => setCurrentPage(page);

  const from = indexOfFirstItem + 1;
  const to = indexOfLastItem > allItems.length ? allItems.length : indexOfLastItem;

  const handleChangeItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
       Page {currentPage} (items {from} - {to} of {allItems.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleChangeItemsPerPage}
          >
            {Object.values(ItemsPerPageOptions).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        onPageChange={paginate}
        total={allItems.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
      />
      <ul>
        {currentItems.map((item: Item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
