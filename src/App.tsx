import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [curentPage, setCurentPage] = useState(1);
  // const onPageChange = {(page) => { ... }}

  const total = items.length;
  const firstPage = perPage * curentPage - perPage;
  const lastPage = perPage * curentPage;
  const visibleItems = items.slice(firstPage, lastPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${curentPage} (${perPage * curentPage - perPage + 1} - ${perPage * curentPage < total ? perPage * curentPage : total} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(+event.target.value);
              setCurentPage(1);
            }}
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
        curentPage={curentPage}
        onPageChange={setCurentPage}
      />

      <ul>
        {visibleItems.map(item => (<li data-cy="item" key={item}>{item}</li>))}
      </ul>

    </div>
  );
};

export default App;
