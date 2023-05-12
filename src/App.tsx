import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const maxItems = 42;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const toMax = perPage * currentPage;
  const to = toMax < maxItems ? toMax : maxItems;
  const from = (currentPage - 1) * perPage + 1;
  const items = getNumbers(from, to).map(n => `Item ${n}`);

  const setItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setPerPage(+value);
  };

  const changePage = (page: number) => {
    if (page === currentPage) {
      return;
    }

    setCurrentPage(page);
  };

  useEffect(() => {
    changePage(1);
  }, [perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${from} - ${to} of ${maxItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            value={perPage}
            onChange={setItemsPerPage}
            id="perPageSelector"
            className="form-control"
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
        total={maxItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={changePage}
      />

      <ul>
        {items.map((el) => (
          <li data-cy="item" key={el}>{`${el}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
