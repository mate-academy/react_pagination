import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

import {
  items,
  itemsPerPageList,
  totalItemsCount,
  defaultItemsPerPage,
} from './constants';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  let endItem = currentPage * itemsPerPage;
  const startItem = endItem - itemsPerPage + 1;

  if (endItem > items.length) {
    endItem = items.length;
  }

  const visibleItems = getNumbers(startItem, endItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {itemsPerPageList.map(item => (
              <option value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItemsCount}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item">
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
