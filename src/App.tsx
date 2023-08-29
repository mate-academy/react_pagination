import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;

const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleItemsPerPage = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setSelectedPage(1);
  };

  const firstItemOnThePage = ((selectedPage - 1) * itemsPerPage) + 1;
  const lastItemOnPage = selectedPage * itemsPerPage < TOTAL_ITEMS
    ? selectedPage * itemsPerPage
    : TOTAL_ITEMS;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${firstItemOnThePage} - ${lastItemOnPage} of ${TOTAL_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleItemsPerPage}
            value={itemsPerPage.toString()}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={TOTAL_ITEMS}
        perPage={itemsPerPage}
        currentPage={selectedPage}
        onPageChange={setSelectedPage}
      />
    </div>
  );
};

export default App;
