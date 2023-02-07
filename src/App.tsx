import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { CURRENT_PAGE_DEFAULT_VALUE, PER_PAGE_DEFAULT_VALUE } from './constans';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const itemsList = items;

  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_DEFAULT_VALUE);
  const [perPage, setPerPage] = useState(PER_PAGE_DEFAULT_VALUE);

  const handlerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setPerPage(+value);
    setCurrentPage(1);
  };

  const handlePage = (newPageNumber: number) => {
    setCurrentPage(newPageNumber);
  };

  const startItem = currentPage * perPage - perPage;
  const endItem = perPage * currentPage <= itemsList.length
    ? perPage * currentPage
    : itemsList.length;
  const itemsOnPage = items.slice(startItem, endItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${endItem} of ${itemsList.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlerSelect}
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
        total={itemsList.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePage}
      />

      <ul>
        {itemsOnPage.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
