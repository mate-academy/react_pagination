import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(options[1]);

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  };

  const getItemsPerCurrentPage
    = ():string[] => items
      .filter((_, i) => i >= (currentPage - 1) * perPage
      && i < currentPage * perPage);

  const itemsPerCurrentPage = getItemsPerCurrentPage();

  const firstItemPerPage = (currentPage - 1) * perPage + 1;
  const lastItemPerPage = currentPage * perPage < items.length
    ? currentPage * perPage
    : items.length;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${
          firstItemPerPage} - ${lastItemPerPage} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">

          <select
            value={perPage}
            onChange={handleChange}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}

          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ul>
        {itemsPerCurrentPage.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}

      </ul>
    </div>
  );
};

export default App;
