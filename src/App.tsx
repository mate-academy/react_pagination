import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList';

type Event = React.ChangeEvent<HTMLSelectElement>;

const TOTAL_ITEMS = 42;
const ITEMS_PER_PAGE = [3, 5, 10, 20];
const ITEMS_PER_PAGE_BY_DEFAULT = ITEMS_PER_PAGE[1];
const CURRENT_PAGE_BY_DEFAULT = 1;

const items = getNumbers(1, TOTAL_ITEMS)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_BY_DEFAULT);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_BY_DEFAULT);

  const handleItemsPerPageChange = (e: Event): void => {
    setItemsPerPage(+e.target.value);
    setCurrentPage(CURRENT_PAGE_BY_DEFAULT);
  };

  const startItem = currentPage * itemsPerPage - itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, TOTAL_ITEMS);

  const itemsToRender = items.slice(startItem - 1, endItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${TOTAL_ITEMS})`}
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
            {ITEMS_PER_PAGE.map(number => (
              <option
                value={number}
                key={number}
              >
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />

      <ItemList items={itemsToRender} />
    </div>
  );
};

export default App;
