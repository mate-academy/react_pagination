import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const totalPages = 42;
const selectOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(selectOptions[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const maxItemPerPage = perPage * currentPage;
  const firstItemOnPage = maxItemPerPage - perPage;

  const lastItemOnPage = maxItemPerPage > totalPages
    ? totalPages
    : maxItemPerPage;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage + 1} - ${lastItemOnPage} of ${totalPages})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChange}
          >

            {selectOptions.map(option => (
              <option value={option} key={option}>
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
        total={totalPages}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {items.slice(firstItemOnPage, lastItemOnPage).map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
