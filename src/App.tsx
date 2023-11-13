import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { itemsCount } from './constants/itemsCount';
import { ItemsOnPage } from './types/itemsOnPage';
import { items } from './constants/items';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage]
    = useState<ItemsOnPage>(ItemsOnPage.Three);

  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items 1 - 5 of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectorChange}
            value={itemsPerPage}
          >
            <option value={ItemsOnPage.Three}>
              {ItemsOnPage.Three}
            </option>
            <option value={ItemsOnPage.Five}>
              {ItemsOnPage.Five}
            </option>
            <option value={ItemsOnPage.Ten}>
              {ItemsOnPage.Ten}
            </option>
            <option value={ItemsOnPage.Twenty}>
              {ItemsOnPage.Twenty}
            </option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={itemsCount.max}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        items={items}
      />
    </div>
  );
};
