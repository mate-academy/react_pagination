import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const firstItem = 1;
const lastItem = 42;
const countOfItemsInPage = 5;
const options = [3, 5, 10, 20];

const items = getNumbers(firstItem, lastItem)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsInPage, setItemsInPage] = useState(countOfItemsInPage);
  const [currentPage, setCurrentPage] = useState(firstItem);

  const lastItemInPage = currentPage * itemsInPage;

  const startItem = (currentPage - 1) * itemsInPage + 1;
  const endItem = lastItemInPage > items.length
    ? items.length
    : lastItemInPage;

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const visibleNumbers = getNumbers(startItem, endItem);

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsInPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsInPage}
            onChange={handleChangePerPage}
          >
            {options.map(option => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        itemsInPage={itemsInPage}
        currentPage={currentPage}
        onPageChange={changePage}
      />

      <ul>
        {visibleNumbers.map(num => (
          <li data-cy="item">
            {`Item ${num}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
