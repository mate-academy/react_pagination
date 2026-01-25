import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

type PageSize = 3 | 5 | 10 | 20;
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const total = items.length;

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<PageSize>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, total);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => {
              setItemsPerPage(Number(event.target.value) as PageSize);
              setCurrentPage(1);
            }}
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
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {visibleItems.map((item: string) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
