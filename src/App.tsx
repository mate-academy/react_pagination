import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const totalItems = items.length;
  const firstDisplayItem = currentPage * itemsPerPage - itemsPerPage + 1;
  const lastDisplayItem = currentPage * itemsPerPage > totalItems
    ? totalItems
    : currentPage * itemsPerPage;

  const visibleItems = items.slice(firstDisplayItem - 1, lastDisplayItem);

  const handleChangePage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setitemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstDisplayItem} - ${lastDisplayItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => handleChangePage(event)}
            value={itemsPerPage}
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
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ul>
        {visibleItems.map(item => <li data-cy="item" key={item}>{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
