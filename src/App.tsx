import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const itemsNumber = ['3', '5', '10', '20'];

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(itemsNumber[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemNumbers = getNumbers(1, 42);
  const start = (currentPage - 1) * +itemsPerPage;
  const currentItems: number[]
  = itemNumbers.slice(start, start + Number(itemsPerPage));

  const handleOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const prevButton = () => {
    setCurrentPage(current => current - 1);
  };

  const nextButton = () => {
    setCurrentPage(current => current + 1);
  };

  const currentInfo = `Page ${currentPage} (items ${currentItems[0]} - ${currentItems.slice(-1)} of 42)`;

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
        currentItems={currentItems}
        onPageChange={onPageChange}
        prevButton={prevButton}
        nextButton={nextButton}
      />
    </div>
  );
};

export default App;
