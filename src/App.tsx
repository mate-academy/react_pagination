import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;
const options = [3, 5, 10, 20];
const items = getNumbers(1, total)
  .map(n => n);

export const App: React.FC = () => {
  const [onPage, setOnPage] = useState(options[2]);
  const [currentPage, setCurrentPage] = useState(1);

  const selectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOnPage(+event.target.value);
    setCurrentPage(1);
  };

  function getItemsOnPage() {
    return items.filter(item => {
      return +item > currentPage * onPage - onPage
        && +item <= currentPage * onPage;
    });
  }

  const itemsOnPage = getItemsOnPage();

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsOnPage[0]} - ${itemsOnPage[itemsOnPage.length - 1]} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={onPage}
            onChange={selectOption}
          >
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        onPage={onPage}
        currentPage={currentPage}
        buttonPageChange={(buttonPage) => setCurrentPage(buttonPage)}
      />

      <ul>
        {itemsOnPage.map(item => (
          <li key={item} data-cy="item">
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
