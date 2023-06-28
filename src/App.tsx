import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const total = items.length;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  let lastIndexOnPage = itemsPerPage * currentPage;

  if (lastIndexOnPage > total) {
    lastIndexOnPage = total;
  }

  const firstIndexOnPage = (currentPage - 1) * itemsPerPage;
  const visibleItems = items.slice(firstIndexOnPage, lastIndexOnPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstIndexOnPage + 1} - ${lastIndexOnPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={onSelect}
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
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        { visibleItems.map(item => (
          <li data-cy="item">
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default App;
