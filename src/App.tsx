import React, { useState } from 'react';
import './App.css';

import { getNumbers, getNumbersForCurrentPage } from './utils';
import { Pagination } from './components/Pagination/Pagination';
import { ItemsPerPageType } from './types';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage]
    = useState<number>(ItemsPerPageType.Medium);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsQuantity = items.length;

  const itemsToRender = getNumbersForCurrentPage(
    itemsQuantity,
    currentPage,
    itemsPerPage,
  );

  const minItemOnCurrentPage = itemsToRender[0];
  const maxItemOnCurrentPage = itemsToRender[itemsToRender.length - 1];

  const handlePageChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const currentAnchor = event.currentTarget.href.split('#')[1];

    if (currentAnchor === 'next') {
      setCurrentPage(currentPage + 1);

      return;
    }

    if (currentAnchor === 'prev') {
      setCurrentPage(currentPage - 1);

      return;
    }

    setCurrentPage(Number(currentAnchor));
  };

  const handlePageSizeSelect
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${minItemOnCurrentPage} - ${maxItemOnCurrentPage} of ${itemsQuantity})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={itemsPerPage}
            onChange={handlePageSizeSelect}
          >
            <option value={ItemsPerPageType.Small}>
              {ItemsPerPageType.Small}
            </option>

            <option value={ItemsPerPageType.Medium}>
              {ItemsPerPageType.Medium}
            </option>

            <option value={ItemsPerPageType.Large}>
              {ItemsPerPageType.Large}
            </option>

            <option value={ItemsPerPageType.ExtraLarge}>
              {ItemsPerPageType.ExtraLarge}
            </option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={itemsQuantity}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {itemsToRender.map(item => (
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
