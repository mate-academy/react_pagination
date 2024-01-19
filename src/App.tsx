import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { GetVisiblItems } from './components/typs/GetVisiblItems';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const getVisiblItems: GetVisiblItems = (complitItems, page, perPage) => {
  const visiblItems = [];

  const fromItems = page * perPage - perPage;
  const toItems = page * perPage;

  for (let i = fromItems; i < toItems; i += 1) {
    if (!complitItems[i]) {
      return visiblItems;
    }

    visiblItems.push(complitItems[i]);
  }

  return visiblItems;
};

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const changePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setPage(1);
  };

  const visiblItems = getVisiblItems(items, page, perPage);

  const fromItems = page * perPage - perPage + 1;
  const toItems = page * perPage > items.length ? items.length : page * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${fromItems} - ${toItems} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={changePerPage}
            defaultValue={5}
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
        perPage={perPage}
        currentPage={page}
        onPageChange={setPage}
      />
      <ul>
        {visiblItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
