import React, { ChangeEvent, useState } from 'react';
import './App.css';
// import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
const itemsPerPage = 5;

export const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const countOfPages: number = Math.ceil(TOTAL_ITEMS / selectedValue);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(parseFloat(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {selectedValue * (currentPage - 1) + 1} -{' '}
        {selectedValue * (currentPage - 1) + selectedValue <= TOTAL_ITEMS
          ? selectedValue * (currentPage - 1) + selectedValue
          : TOTAL_ITEMS}{' '}
        of {TOTAL_ITEMS})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedValue}
            onChange={handleChange}
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
        countOfPages={countOfPages}
        total={TOTAL_ITEMS}
        perPage={selectedValue}
        currentPage={currentPage}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default App;
