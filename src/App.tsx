import React from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { PerPageSelector } from './components/PerPageSelector';
import { usePagination } from './hooks/usePagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const {
    itemsToShow,
    showFrom,
    showTo,
    currentPage,
    selectedPerPage,
    totalItems,
    onPageChange,
    onPerPageChange,
  } = usePagination({ items });

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${showFrom} - ${showTo} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <PerPageSelector onChange={onPerPageChange} />
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={selectedPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {itemsToShow.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
