import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { DropdownOption } from './components/DropdownOption/DropdownOption';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * perPage;
  const endIdx = startIdx + perPage;
  const visibleItems = items.slice(startIdx, endIdx);

  const firstItem = startIdx + 1;
  const endItem = Math.min(endIdx, items.length);

  const handlePerPageChange = (value: number) => {
    setCurrentPage(1);
    setPerPage(value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <DropdownOption value={perPage} onChange={handlePerPageChange} />

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
