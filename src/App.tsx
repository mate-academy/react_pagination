import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';

export const App: React.FC = () => {
  const total = 42;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  const startItem = currentPage * itemPerPage - (itemPerPage - 1);
  let endItem = currentPage * itemPerPage;

  if (endItem > total) {
    endItem = total;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {
          `Page ${currentPage} (items ${startItem} - ${endItem} of ${total})`
        }
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={e => {
              setItemPerPage(+e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5" defaultChecked>5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={itemPerPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
        endItem={endItem}
        startItem={startItem}
      />
    </div>
  );
};

export default App;
