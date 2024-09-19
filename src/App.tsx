import React, { useState } from 'react';

import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const optionsPerPage = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(optionsPerPage[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const firstVisibleItemIndex = (currentPage - 1) * perPage;
  const lastVisibleItemIndex = Math.min(42, currentPage * perPage);

  const visibleItems = items.slice(firstVisibleItemIndex, lastVisibleItemIndex);

  const handlePageChange = (newPage: number) => {
    const maxPage = Math.ceil(items.length / perPage);

    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstVisibleItemIndex + 1} - ${lastVisibleItemIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={optionsPerPage[1]}
            onChange={handleSelectChange}
          >
            {optionsPerPage.map(value => (
              <option value={value} key={value}>
                {value}
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
        onPageChange={handlePageChange}
      />
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
