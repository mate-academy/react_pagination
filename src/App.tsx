import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, TOTAL_ITEMS);

export const App: React.FC = () => {
  type PerPage = 3 | 5 | 10 | 20;
  const [itemsPerPage, setItemsPerPage] = useState<PerPage>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const visibleList = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const PerPageArr: PerPage[] = [3, 5, 10, 20];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {visibleList[0]} -
        {visibleList[visibleList.length - 1]} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(+e.target.value as PerPage);
              setCurrentPage(1);
            }}
          >
            {PerPageArr.map((perPage, index) => (
              <option key={index} value={perPage}>
                {perPage}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={42}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleList.map((item, index) => (
          <li key={index} data-cy="item">
            Item {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
