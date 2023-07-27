import React, { useState } from 'react';
import './App.css';
import { getNumbers, getLastIndex } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const initialPage = 1;
  const initialItemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const total = items.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(initialPage);
  };

  const lastIndexOnPage = getLastIndex(itemsPerPage, currentPage, total);
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
        onPageChange={handlePageChange}
      />
      <ul>
        { visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default App;
