import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const totalItems = 42;
const firstPage = 1;

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [initialPage, setInitialPage] = useState(firstPage);

  const maxItems = initialPage * itemsOnPage;
  const startVisibleItems = maxItems - itemsOnPage;
  const endVisibleItems = maxItems > totalItems
    ? totalItems
    : maxItems;

  const selectedItems = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsOnPage(+event.target.value);
  };

  const visibleItems = getNumbers(firstPage, totalItems).map(item => (
    <li
      data-cy="item"
      key={item}
    >
      {`Item ${item}`}
    </li>
  )).slice(startVisibleItems, endVisibleItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${initialPage} (items ${startVisibleItems + 1} - ${endVisibleItems} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsOnPage}
            onChange={selectedItems}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={itemsOnPage}
        currentPage={initialPage}
        onPageChange={setInitialPage}
      />
      <ul>
        {visibleItems}
      </ul>
    </div>
  );
};

export default App;
