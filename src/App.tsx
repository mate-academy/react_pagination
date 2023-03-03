import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { currentItems, numberOfPages } from './utils';

const itemsNumber = ['3', '5', '10', '20'];

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(itemsNumber[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const items = currentItems(42, currentPage, itemsPerPage);

  const handleOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const prevButton = () => {
    setCurrentPage(current => Math.max(1, current - 1));
  };

  const nextButton = () => {
    setCurrentPage(current => Math.min(
      numberOfPages(42, itemsPerPage), current + 1,
    ));
  };

  const currentInfo = `Page ${currentPage} (items ${items[0]} - ${items.slice(-1)} of 42)`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">{currentInfo}</p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleOption}
          >
            {itemsNumber.map(number => (
              <option
                value={number}
                key={number}
              >
                {number}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={42}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        prevButton={prevButton}
        nextButton={nextButton}
      />
    </div>
  );
};
