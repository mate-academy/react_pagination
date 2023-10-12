import React, { useState } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const options = [3, 5, 10, 20];
  const [perPage, setPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const lastIndex = perPage * pageNumber;
  const firstIndex = lastIndex - perPage;

  const handleOptionChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setPageNumber(1);
  });

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pageNumber} (items ${firstIndex + 1} - ${lastIndex > items.length ? items.length : lastIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleOptionChange}
          >
            {options.map(option => <option value={option}>{option}</option>)}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
      />

      <ul>
        {items
          .slice(firstIndex, lastIndex)
          .map(item => <li data-cy="item" key={item}>{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
