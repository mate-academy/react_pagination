import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setcurrentPage] = useState<number>(1);
  const itemsPerPageOptions = [3, 5, 10, 20];
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setcurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setcurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {currentPage - 1 * itemsPerPage + 1} -
        {Math.min(currentPage * itemsPerPage, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={handlePageChange}
        items={items}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default App;
