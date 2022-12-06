import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const lastItem = currentPage * itemPerPage > items.length
    ? items.length
    : currentPage * itemPerPage;

  const firstItem = (currentPage - 1) * itemPerPage + 1;

  const getVisibleItems = () => [...items].slice(firstItem - 1, lastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemPerPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={itemPerPage}
            className="form-control"
            onChange={(ev) => setItemPerPage(+ev.target.value)}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {getVisibleItems().map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
