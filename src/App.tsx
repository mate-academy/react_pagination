import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEFAULT_PAGE = 1;
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const startItem = (currentPage - 1) * itemsPerPage;
  let endItem = startItem + itemsPerPage;

  if (endItem > items.length) {
    endItem = items.length;
  }

  const handlerPageChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => {
              setItemsPerPage(Number(event.target.value));
              setCurrentPage(DEFAULT_PAGE);
            }}
          >
            {[3, 5, 10, 20].map(number => (
              <option value={number} key={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        totalItems={items}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlerPageChange}
        startItem={startItem}
        endItem={endItem}
      />
    </div>
  );
};

export default App;
