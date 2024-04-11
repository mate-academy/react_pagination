import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const totalItems = (allItem: string[], max: number, page: number): string[] => {
  const itemsArray = [...allItem];
  const startIndex = (page - 1) * max;
  const endIndex = Math.min(startIndex + max - 1, itemsArray.length - 1);
  const visibleElements = itemsArray.slice(startIndex, endIndex + 1);

  return visibleElements;
};

const itemsInfo = (visibleItems: string[]): string[] => {
  const firstItem = visibleItems[0].slice(5);
  const lastItem = visibleItems[visibleItems.length - 1].slice(5);

  return [firstItem, lastItem];
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(event.target.value);

    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const itemsVisible = totalItems(items, perPage, currentPage);
  const numberInfo = itemsInfo(itemsVisible);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {numberInfo[0]} - {numberInfo[1]} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
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
        total={itemsVisible}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          if (page !== currentPage) {
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
};

export default App;
