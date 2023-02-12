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

  const renderStart = itemsPerPage * (currentPage - 1);
  const renderEnd = renderStart + itemsPerPage;
  const renderedItems = items.slice(renderStart, renderEnd);

  let lastVisibleItem = 0;

  if (renderStart + itemsPerPage + 1 > totalItems) {
    lastVisibleItem = totalItems;
  } else {
    lastVisibleItem = renderStart + itemsPerPage;
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
        {`Page ${currentPage} (items ${renderStart + 1} - ${lastVisibleItem} of ${totalItems})`}
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
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {renderedItems.map(renderedItem => (
          <li
            data-cy="item"
            key={renderedItem}
          >
            {renderedItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
