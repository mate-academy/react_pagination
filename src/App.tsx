import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [visibleItems, setVisibleItems] = useState(items.slice(0, perPage));

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);

    setPerPage(newPerPage);
    setCurrentPage(1);
    setVisibleItems(items.slice(0, newPerPage));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setVisibleItems(items
      .slice((page - 1) * perPage, page * perPage));
  };

  const firstVisibleItem = (currentPage - 1) * perPage + 1;
  const lastVisibleItem = Math.min((currentPage * perPage), items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstVisibleItem} - ${lastVisibleItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
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
        total={items.length} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(item => <li key={item} data-cy="item">{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
