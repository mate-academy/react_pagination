import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const total = 42;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [startItem, setStartItem] = useState(1);
  const [endItem, setEndItem] = useState(5);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = +event.target.value;

    setPerPage(newPerPage);
    setCurrentPage(1);
    setStartItem(1);
    setEndItem(newPerPage);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setStartItem(perPage * page + 1 - perPage);
    setEndItem(Math.min(total, perPage * page));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelect}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handleChangePage}
        startItem={startItem}
        endItem={endItem}
      />
    </div>
  );
};

export default App;
