import React, { useState, useMemo } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => +n);
const total = 42;
const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(options[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const setPerPageSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const itemsOnPage = useMemo(() => {
    const indexOfFirstItem = currentPage * perPage - perPage;
    const indexOfLastItem = currentPage * perPage;

    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsOnPage[0]} - ${itemsOnPage[itemsOnPage.length - 1]} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={setPerPageSelector}
          >
            {options.map(option => (
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
        currentPage={currentPage}
        onPageChange={button => setCurrentPage(button)}
      />

      <ul>
        {itemsOnPage.map(item => (
          <li key={item} data-cy="item">{`Item ${item}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
