import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(number => `Item ${number}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItemsAmount = items.length;
  const minItemNumberOnPage = currentPage * perPage - perPage + 1;
  const maxItemNumberOnPage = currentPage * perPage > totalItemsAmount
    ? totalItemsAmount
    : currentPage * perPage;

  const handleChangingPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const itemsToView = items
    .filter(
      (_, index) => index + 1 >= minItemNumberOnPage
        && index + 1 <= maxItemNumberOnPage,
    )
    .map(item => (
      <li key={item + 1} data-cy="item">{item}</li>
    ));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${minItemNumberOnPage} - ${maxItemNumberOnPage} of ${totalItemsAmount})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            onChange={event => {
              setCurrentPage(1);
              setPerPage(+event.target.value);
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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
        total={totalItemsAmount} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={handleChangingPage}
      />

      <ul>
        {itemsToView}
      </ul>
    </div>
  );
};

export default App;
