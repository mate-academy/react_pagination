import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => ({ title: `Item ${n}`, id: uuidv4() }));

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const startIndex = (currentPage - 1) * perPage;
  const possibleEndIndex = startIndex + perPage;
  const endIndex = possibleEndIndex > items.length
    ? items.length
    : possibleEndIndex;

  const visibleItems = items.slice(startIndex, endIndex);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePerPageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        {/* Move to separete component */}
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageSelect}
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      {/* Move to separate component */}
      <ul>
        {visibleItems.map(({ title, id }) => (
          <li key={id} data-cy="item">{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
