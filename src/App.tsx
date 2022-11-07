import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const total = items.length;

  const startRender = (currentPage - 1) * itemsPerPage;
  const endRender = currentPage * itemsPerPage;

  return (
    <>
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          {`Page ${currentPage} items ${startRender + 1} 
          - ${total > endRender ? endRender : total} of ${total}`}
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
              onChange={(e) => {
                setItemsPerPage(+e.target.value);
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

        {/* Move this markup to Pagination */}
        <Pagination
          total={items.length}
          perPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <ul>
          {items.map(item => (
            <li data-cy="item">{item}</li>
          )).slice(startRender, endRender)}
        </ul>
      </div>
    </>
  );
};

export default App;
