import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPageSelector, setItemsPerPageSelector] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const visibleItemsStart = itemsPerPageSelector * (selectedPage - 1) + 1;
  const visibleItemsEnd = (visibleItemsStart + itemsPerPageSelector - 1
    > items.length)
    ? items.length
    : visibleItemsStart + itemsPerPageSelector - 1;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPageSelector(+event.target.value);
    setSelectedPage(1);
  };

  const handlePageSelect = (page: number) => {
    if (page === selectedPage) {
      return;
    }

    setSelectedPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${visibleItemsStart} - ${visibleItemsEnd} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPageSelector}
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
        total={items.length}
        perPage={itemsPerPageSelector}
        currentPage={selectedPage}
        onPageChange={handlePageSelect}
      />

      <ul>
        {items.slice(visibleItemsStart - 1, visibleItemsEnd).map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
