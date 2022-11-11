import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items: number[] = getNumbers(1, 42);
const total = 42;
const initialItemsPerPage = 5;
const initialPage = 1;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = getNumbers(1, Math.ceil(total / perPage));
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const itemsOnPage = items.filter((item) => (
    item > currentPage * perPage - perPage
    && item <= currentPage * perPage
  ));

  const onPageChange = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.id === 'prevLink') {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (event.currentTarget.id === 'nextLink') {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(Number(event.currentTarget.innerText));
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsOnPage[0]} - `
        + `${itemsOnPage[itemsOnPage.length - 1]} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={onChange}
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
        itemsOnPage={itemsOnPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
