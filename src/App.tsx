import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList';
import { getNumbers, calculateStartAndEnd } from './utils';

const itemsPerPageOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);

  const items = getNumbers(1, 42).map(n => `Item ${n}`);
  const itemsLength = items.length;
  const { start, end } = calculateStartAndEnd(items, page, itemsPerPage);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${start + 1} - ${end} of ${itemsLength})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => handleItemsPerPageChange(+event.target.value)}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
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
        total={itemsLength || 1}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />

      <ItemList items={items.slice(start, end)} key={page} />
    </div>
  );
};
