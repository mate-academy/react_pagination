import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

enum ItemsPerPage {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(ItemsPerPage.Five);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const displayedItems = items.slice((currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage);
  const startIndex = itemsPerPage * (currentPage - 1);
  const endIndex = Math.min(startIndex + itemsPerPage, items.length) - 1;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${Math.min(endIndex + 1, items.length)} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handlePerPageChange}
          >
            <option value={ItemsPerPage.Three}>{ItemsPerPage.Three}</option>
            <option value={ItemsPerPage.Five}>{ItemsPerPage.Five}</option>
            <option value={ItemsPerPage.Ten}>{ItemsPerPage.Ten}</option>
            <option value={ItemsPerPage.Twenty}>{ItemsPerPage.Twenty}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {displayedItems.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
