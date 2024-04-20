import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const optionsList = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const firstItem = currentPage * perPage - perPage;
  let lastItem = firstItem + perPage;
  const listOfItems = items.slice(firstItem, lastItem);

  if (lastItem > items.length) {
    lastItem = items.length;
  }

  const handleList = (page: number) => {
    setPerPage(page);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => handleList(+event.target.value)}
          >
            {optionsList.map(item => (
              <option key={item} value={item} onChange={() => setPerPage(item)}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {listOfItems.map(item => (
          <li data-cy="item" key={item} value={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
