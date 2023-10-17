import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const listOfOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(listOfOptions[1]);
  const [currentPage, setCurrentPage] = useState(1);
  const total = items.length;
  const lastItem = currentPage * perPage;
  const toItem = lastItem > total ? total : lastItem;
  const fromItem = (perPage * (currentPage - 1)) + 1;

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleOptionChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(+evt.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromItem} - ${toItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={handleOptionChange}
          >
            {listOfOptions.map((option) => (
              <option
                key={option}
                value={option}
              >
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => handlePageChange(page)}
      />
    </div>
  );
};

export default App;
