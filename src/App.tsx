import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const total = 42;
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(3);
  const items = Array.from({ length: 42 }, (_, index) => index + 1);
  const options = [3, 5, 10, 15];

  const lastItemOnPage = selectedPage * selectedOption;
  const firstItemOnPage = lastItemOnPage - selectedOption;

  const pageChangeHandler = (page: number, option: number) => {
    if (page * option > items.length) {
      setSelectedPage(1);
      setSelectedOption(option);

      return;
    }

    setSelectedPage(page);
    setSelectedOption(option);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${Math.min(firstItemOnPage + 1, total)} - ${Math.min(lastItemOnPage, total)} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedOption}
            onChange={(e) => {
              pageChangeHandler(selectedPage, parseInt(e.target.value, 10));
            }}
          >
            {options.map((opt) => (
              <option
                key={opt}
              >
                {opt}
              </option>
            ))}

          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={total}
        perPage={selectedOption}
        currentPage={selectedPage}
        items={items}
        onPageChange={setSelectedPage}
      />
    </div>
  );
};

export default App;
