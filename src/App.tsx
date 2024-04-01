import React, { useState } from 'react';
import './App.css';


import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';



enum PageSpecs {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<PageSpecs>(PageSpecs.Three);
  const [currPage, setCurrPage] = useState<number>(1);

  const pagiPagesCount = Math.ceil(items.length / perPage);

  const firstItem = (currPage - 1) * perPage + 1;
  const lastItem = Math.min(currPage * perPage, items.length);

  const startIndex = (currPage - 1) * perPage;
  const lastIndex = startIndex + perPage;

  const onPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value) as PageSpecs);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currPage} (items {firstItem} - {lastItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={onPageChange}
            value={perPage}
          >
            <option value={PageSpecs.Three}>{PageSpecs.Three}</option>

            <option value={PageSpecs.Five}>{PageSpecs.Five}</option>

            <option value={PageSpecs.Ten}>{PageSpecs.Ten}</option>

            <option value={PageSpecs.Twenty}>{PageSpecs.Twenty}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={pagiPagesCount}
        currPage={currPage}
        setCurrPage={setCurrPage}
      />
      <ul>
        {items
          .slice(startIndex, lastIndex)
          .map((item, i) => (
          <li data-cy="item" key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
