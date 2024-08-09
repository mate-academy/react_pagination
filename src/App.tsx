import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import Pagination from './components/Pagination/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const startNum = itemsPerPage * activePage - itemsPerPage;
  const finishNum = itemsPerPage * activePage;
  const countOfItems = items.length;
  const firstItemNumberOnPage = startNum + 1;
  const lastItemNumberOnPage =
    finishNum <= countOfItems ? finishNum : countOfItems;

  const filteredItemsPerPage = items.slice(startNum, finishNum);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setActivePage(1);
  };

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {activePage} (items {firstItemNumberOnPage} -{' '}
        {lastItemNumberOnPage} of {countOfItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleSelectChange}
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
        total={items.length}
        perPage={itemsPerPage}
        currentPage={activePage}
        onPageChange={handlePageChange}
      />

      <ul>
        {filteredItemsPerPage.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
