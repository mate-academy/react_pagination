import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { ListItems } from './components/ListItems';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const defaultItemPerPage = 5;

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesNumber = Math.ceil(items.length / itemsPerPage);
  const startIndexOnCurrentPage = (currentPage - 1) * itemsPerPage;
  const endIndexOnCurrentPage =
    currentPage < pagesNumber
      ? currentPage * itemsPerPage
      : startIndexOnCurrentPage + items.length - startIndexOnCurrentPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndexOnCurrentPage + 1} -{' '}
        {endIndexOnCurrentPage} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={defaultItemPerPage}
            onChange={e => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
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
        total={pagesNumber}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ListItems
        items={items}
        startIndex={startIndexOnCurrentPage}
        endIndex={endIndexOnCurrentPage}
      />
    </div>
  );
};

export default App;
