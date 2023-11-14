import React, { ChangeEvent, useCallback, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { itemsCount } from './constants/itemsCount';
import { ItemsOnPage } from './types/itemsOnPage';
import { items } from './constants/items';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage]
    = useState<ItemsOnPage>(ItemsOnPage.Three);
  const [currentPage, setCurrentPage] = useState(1);
  const firstItemOnPage = (currentPage * itemsPerPage) - itemsPerPage;
  const lastItemOnPage = (currentPage * itemsPerPage) - 1;

  const handleSelectorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.target.value);
    setCurrentPage(1);
  };

  const onPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [currentPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage + 1} - ${
          lastItemOnPage + 1 > 42 ? 42 : lastItemOnPage + 1
        } of ${itemsCount.max})`}
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
        onPageChange={onPageChange}
        items={items}
        firstItemOnPage={firstItemOnPage}
        lastItemOnPage={lastItemOnPage}
      />
    </div>
  );
};
