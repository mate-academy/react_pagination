import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => (<li key={n} data-cy="item">{`Item ${n}`}</li>));

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const itemsCountTo = currentPage * itemsPerPage > items.length
    ? items.length
    : currentPage * itemsPerPage;

  const itemsCountFrom = currentPage * itemsPerPage > items.length
    ? (currentPage - 1) * itemsPerPage + 1
    : itemsCountTo - itemsPerPage + 1;

  const handleItemQntyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsCountFrom} - ${itemsCountTo} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={itemsPerPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleItemQntyChange}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <ul>
        {items
          .filter((_, i) => i + 1 >= itemsCountFrom && i + 1 <= itemsCountTo)}
      </ul>
    </div>
  );
};

export default App;
