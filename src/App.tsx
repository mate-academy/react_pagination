import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { Option, OPTIONS_VALUES, TOTAL_AMOUNT_OF_ITEMS } from './constants';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(OPTIONS_VALUES['5']);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = event.target.value as Option;
    const numberValue = OPTIONS_VALUES[currentValue];

    setItemsPerPage(numberValue);
    setCurrentPage(1);
  };

  const handlePageChange = (numberOfPage: number) => {
    setCurrentPage(numberOfPage);
  };

  const currentItem = (currentPage - 1) * itemsPerPage + 1;
  let lastItem: number = currentItem + itemsPerPage - 1;

  lastItem = lastItem > 42 ? 42 : lastItem;

  const report = `Page ${currentPage} (items ${currentItem} - ${lastItem} of ${TOTAL_AMOUNT_OF_ITEMS})`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {report}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleSelectInput}
          >
            {Object.entries(OPTIONS_VALUES).map(([value, num]) => (
              <option key={value} value={value}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL_AMOUNT_OF_ITEMS}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
