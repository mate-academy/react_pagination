import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const visibleItems = [...items];
  const total = items.length;
  const firstPageItem = 1 + (currentPage - 1) * itemPerPage;

  const lastPageItem = currentPage * itemPerPage > total
    ? total
    : currentPage * itemPerPage;

  const getVisibleItems = () => visibleItems
    .slice(firstPageItem - 1, lastPageItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemPerPage]);

  useEffect(() => {
    getVisibleItems();
  }, [currentPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstPageItem} - ${lastPageItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={(event) => setItemPerPage(+event.target.value)}
          >
            {options.map(option => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={itemPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {getVisibleItems().map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
