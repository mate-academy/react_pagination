import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const selectOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [total, setTotal] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const pageQuantity = Math.ceil(total / perPage);
  const startItemsRange = perPage * (currentPage - 1) + 1;
  const endItemsRange = pageQuantity === currentPage
    ? total
    : currentPage * perPage;

  const itemsArr = getNumbers(startItemsRange, endItemsRange);

  const perPageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  };

  const toNextPage = () => {
    if (currentPage < pageQuantity) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const toPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevState => prevState - 1);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>{`${total} Items with Pagination`}</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItemsRange} - ${endItemsRange} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={perPageChangeHandler}
          >
            {selectOptions
              .map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <input
            type="number"
            id="total"
            min={1}
            className="form-control"
            value={total}
            onChange={(e) => {
              setTotal(+e.target.value);
            }}
          />
        </div>

        <label htmlFor="total" className="col-form-label col">
          total number of pages (can be changed)
        </label>
      </div>
      <Pagination
        currentPage={currentPage}
        pageQuantity={pageQuantity}
        toNextPage={toNextPage}
        toPrevPage={toPrevPage}
        onPageChange={onPageChange}
      />
      <ul>
        {itemsArr.map(item => <li key={item} data-cy="item">{`Item ${item}`}</li>)}
      </ul>
    </div>
  );
};
