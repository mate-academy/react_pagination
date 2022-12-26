import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectPerPage, setSelectPerPage] = useState(5);
  const [total, setTotal] = useState(items.length);
  const [itemPerPage, setItemPerPage] = useState([...items]
    .slice(page * selectPerPage - selectPerPage, page * selectPerPage));

  const selectorChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectPerPage(+event.target.value);

    setPage(1);
  });

  useEffect(() => {
    setTotal(items.length);
  }, []);

  useEffect(() => {
    setItemPerPage([...items]
      .slice(page * selectPerPage - selectPerPage, page * selectPerPage));
  }, [page, selectPerPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${+(itemPerPage[0].slice(5))} - ${+(itemPerPage[itemPerPage.length - 1].slice(5))} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectPerPage}
            onChange={selectorChange}
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

      {(total > selectPerPage)
        && (
          <Pagination
            total={total}
            perPage={selectPerPage}
            currentPage={page}
            onPageChange={(event) => {
              setPage(event);
            }}
          />
        )}

      <ul>
        {itemPerPage.map(item => (
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
