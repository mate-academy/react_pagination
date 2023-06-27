import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const totalItems = 42;
  const firstPage = 1;

  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [page, setPage] = useState(firstPage);

  const maxItems = page * itemsOnPage;
  const startVisibleItems = maxItems - itemsOnPage;
  const endVisibleItems = maxItems > totalItems
    ? totalItems
    : maxItems;

  const selectItemsPerPage = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsOnPage(+event.target.value);
    setPage(firstPage);
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const visibleItems = getNumbers(firstPage, totalItems)
    .slice(startVisibleItems, endVisibleItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startVisibleItems + 1} - ${endVisibleItems} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsOnPage}
            onChange={selectItemsPerPage}
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
        totalItems={totalItems}
        itemsOnPage={itemsOnPage}
        selectedPage={page}
        changePage={changePage}
      />

      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
