import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = items.length;

  const renderStart = itemsPerPage * (currentPage - 1) + 1;
  let renderEnd = 0;

  if (renderStart + itemsPerPage > totalItems) {
    renderEnd = totalItems;
  } else {
    renderEnd = renderStart + itemsPerPage - 1;
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setItemsPerPage(+value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${renderStart} - ${renderEnd} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleSelectChange}
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
        items={items}
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
