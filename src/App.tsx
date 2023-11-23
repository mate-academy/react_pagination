import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const arrNums = getNumbers(1, 42);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<string[]>([]);

  const fromItemValue = currentPage === 1 ? 1 : (currentPage - 1) * perPage + 1;
  const toItemValue = currentPage * perPage > arrNums.length
    ? arrNums.length : currentPage * perPage;

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setItems(([...arrNums]).splice((currentPage - 1) * perPage, perPage).map(n => `Item ${n}`));
  }, [currentPage, perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromItemValue} - ${toItemValue} of ${arrNums.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePageChange}
            value={perPage}
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
        currentPage={currentPage}
        perPage={perPage}
        total={arrNums.length}
        onPageChange={setCurrentPage}
      />
      <ul>
        {items.map(elem => (
          <li data-cy="item" key={elem}>{elem}</li>
        ))}
      </ul>
    </div>
  );
};
