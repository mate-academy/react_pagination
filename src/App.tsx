import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42);

export const App: React.FC = () => {
  const total = items.length;
  const countOptions = [3, 5, 10, 20];

  const [searchParams, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    searchParams.set('page', '2');
    searchParams.set('perPage', '7');

    setSearchParams(searchParams);
  },
  []);

  const fromItem = (currentPage - 1) * perPage + 1;
  const toItem = currentPage * perPage > total ? total : currentPage * perPage;

  const visibleItems = getNumbers(fromItem, toItem);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);

    searchParams.set('page', '1');
    searchParams.set('perPage', e.target.value);

    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    searchParams.set('page', page.toString());
    searchParams.set('perPage', perPage.toString());

    setSearchParams(searchParams);
  };

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
            onChange={handleSelect}
            defaultValue={perPage}
          >
            {countOptions.map(option => (
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
        total={total}
        perPage={perPage}
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={handlePageChange}
      />
      <ul>

        {visibleItems.map((item) => (
          <li key={item} data-cy="item">
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
