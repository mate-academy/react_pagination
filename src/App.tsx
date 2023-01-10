import React, { useState } from 'react';
import './App.css';
import { Items } from './components/Items';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState('5');
  const indexOfLastItem = page * +itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - +itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / +itemsPerPage);
  const end = Math.min(indexOfFirstItem + +itemsPerPage, items.length);

  const paginate = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(e.target.value);
    setPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${indexOfFirstItem + 1} - ${end} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            defaultValue="5"
            className="form-control"
            onChange={handleItemsPerPage}
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
        page={page}
        paginate={paginate}
        totalPages={totalPages}
      />
      <Items
        items={currentItems}
      />
    </div>
  );
};

export default App;
