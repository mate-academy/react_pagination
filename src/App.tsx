import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const items = getNumbers(1, total);
  const totalPages = Math.ceil(items.length / perPage);

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  }

  function handleClick(page: number) {
    setCurrentPage(page);
  }

  function showSubtitle(): string {
    if (currentPage === totalPages) {
      return `Page ${currentPage} (items ${indexOfFirstItem + 1} - ${items[items.length - 1]} of ${total})`;
    }

    return `Page ${currentPage} (items ${indexOfFirstItem + 1} - ${indexOfLastItem} of ${total})`;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {showSubtitle()}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectChange}
            value={perPage}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handleClick}
      />
      <ul>
        {currentItems.map(n => (
          <li data-cy="item" key={n}>{`Item ${n}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
