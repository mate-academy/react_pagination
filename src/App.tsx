import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(42);
  const [perPage, setPerPage] = useState(5);

  const pages = Math.ceil(total / perPage);
  const isLastPage = pages === currentPage;
  const firstElement = currentPage * perPage - perPage + 1;
  const lastElement = isLastPage ? total : currentPage * perPage;
  const pageElements = getNumbers(firstElement, lastElement);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSelectedPageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstElement} - ${lastElement} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={5}
            onChange={handlePerPageChange}
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
        onPageChange={handleSelectedPageChange}
      />

      <ul>
        {pageElements.map(element => (
          <li data-cy="item" key={element}>{`Item ${element}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
