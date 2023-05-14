import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const total = 42;

  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<number[]>([]);

  const handleChangePage = (selectedPageId: number) => {
    setCurrentPage(selectedPageId);
  };

  useEffect(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    setItems(getNumbers(1, total).slice(start, end));
  }, [currentPage, perPage]);

  const handlePerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${items[0]} - ${items[items.length - 1]} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={handlePerPageChange}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handleChangePage}
      />

      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>{`Item ${item}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
