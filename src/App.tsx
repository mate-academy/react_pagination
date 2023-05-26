import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const totalItems = 42;
  const defaultItemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (event: { target: { value: string; }; }) => {
    const newPerPage = parseInt(event.target.value, 10);

    setCurrentPage(1);
    setItemsPerPage(newPerPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const items = getNumbers(startIndex, endIndex)
    .map((n) => ({ id: `item-${n}`, text: `Item ${n}` }));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <Pagination
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex} - ${endIndex} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handlePerPageChange}
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

      <ul>
        {items.map((item) => (
          <li key={item.id} data-cy="item">
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
