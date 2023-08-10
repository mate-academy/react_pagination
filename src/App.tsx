import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

enum ItemsPerPage {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(ItemsPerPage.Five);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsCopy = [...items];
  const numberOfPages = Math.ceil(itemsCopy.length / perPage);

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const startIndex = perPage * (currentPage - 1);
  let endIndex = startIndex + perPage - 1;

  if (endIndex > itemsCopy.length) {
    endIndex = itemsCopy.length - 1;
  }

  const visibleItems = [...itemsCopy].slice(startIndex, endIndex + 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex + 1} of ${itemsCopy.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPage}
            value={perPage}
          >
            <option value={ItemsPerPage.Three}>{ItemsPerPage.Three}</option>
            <option value={ItemsPerPage.Five}>{ItemsPerPage.Five}</option>
            <option value={ItemsPerPage.Ten}>{ItemsPerPage.Ten}</option>
            <option value={ItemsPerPage.Twenty}>{ItemsPerPage.Twenty}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={numberOfPages}
        // perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map((item) => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
