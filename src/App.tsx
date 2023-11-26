import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { ItemsOnPage } from './types/itemsOnPage';
import { items } from './constants/items';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage]
    = useState<ItemsOnPage>(ItemsOnPage.Five);
  const [currentPage, setCurrentPage] = useState(1);
  const firstItemIndexOnPage = (currentPage * itemsPerPage) - itemsPerPage;
  const lastItemIndexOnPage = (currentPage * itemsPerPage);
  const visibleItems = items.slice(firstItemIndexOnPage, lastItemIndexOnPage);

  const handleSelectorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndexOnPage + 1} - ${
          lastItemIndexOnPage > items.length
            ? items.length
            : lastItemIndexOnPage
        } of ${items.length})`}
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
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
