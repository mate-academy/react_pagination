import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { Items } from './components/Pagination/Items';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = perPage * currentPage;
  const firstIndex = lastIndex - perPage;
  const currentList = [...items].slice(firstIndex, lastIndex);
  const lastOnPage = (lastIndex > items.length) ? items.length : lastIndex;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const setNumberOfPages = (pages: number) => {
    setPerPage(pages);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstIndex + 1} - ${lastOnPage} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => setNumberOfPages(+event.target.value)}
          >
            <option value="3">3</option>
            <option value="5" selected>5</option>
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
      <Items currentList={currentList} />

    </div>
  );
};

export default App;
