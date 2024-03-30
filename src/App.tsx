import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [pages, setPages] = useState<number[]>(
    getNumbers(1, Math.ceil(items.length / itemsPerPage)),
  );
  const [itemsOnCurrentPage, setItemsOnCurrentPage] = useState(
    getNumbers(currentPage, itemsPerPage * currentPage),
  );

  useEffect(() => {
    setItemsOnCurrentPage(
      getNumbers(
        itemsPerPage * (currentPage - 1),
        itemsPerPage * currentPage > items.length
          ? items.length - 1
          : itemsPerPage * currentPage - 1,
      ),
    );
    setPages(getNumbers(1, Math.ceil(items.length / itemsPerPage)));
  }, [itemsPerPage, currentPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {1 + itemsPerPage * (currentPage - 1)} -{' '}
        {itemsPerPage * currentPage > items.length
          ? items.length
          : itemsPerPage * currentPage}{' '}
        of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => {
              setItemsPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="3">3</option>
            <option selected value="5">
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
      <ul>
        {itemsOnCurrentPage.map(n => (
          <li key={n} data-cy="item">
            {items[n]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
