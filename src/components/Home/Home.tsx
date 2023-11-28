import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination';

import { getNumbers } from '../../utils';

let items = getNumbers(1, 42)
  .map((n:number) => <li data-cy="item">{`Item ${n}`}</li>);

export const Home: React.FC = () => {
  const [maxItems, setMaxItems] = useState(42);
  const [params, setParams] = useSearchParams();

  const currPage = Number(params.get('page')) || 1;
  const qtyOfItems = Number(params.get('perPage')) || 5;
  const firstItem = (currPage - 1) * qtyOfItems + 1;
  const lastItem = (firstItem + qtyOfItems) > items.length
    ? items.length
    : firstItem + qtyOfItems - 1;

  function selectHandler(perPage:number) {
    const oldParams = new URLSearchParams(params);

    oldParams.set('perPage', `${perPage}`);
    oldParams.set('page', '1');
    setParams(oldParams);
  }

  function setNewMax(newMax:number) {
    setMaxItems(newMax);
    items = getNumbers(1, newMax)
      .map((n:number) => <li data-cy="item">{`Item ${n}`}</li>);
    const oldParams = new URLSearchParams(params);

    oldParams.set('page', '1');
    setParams(oldParams);
  }

  return (
    <div className="container">
      <h1>
        Items with Pagination,
        <br />
        {`current items per page is ${params.get('perPage') || 'default is 5'}`}
        <br />
        {`current page is ${params.get('page') || 'default 1'}`}
        <br />
        {`current params are: ${(params.toString()).replace(/&/g, '; ')}`}
      </h1>

      <p className="lead" data-cy="info">
        {`Page ${currPage} (items ${firstItem} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={Number(params.get('perPage')) || 5}
            onChange={e => selectHandler(+e.target.value)}
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
      <div className="form-group row">
        <input
          id="totalItems"
          type="number"
          value={maxItems}
          onChange={e => setNewMax(+e.target.value)}
          max="999"
          className="col-3 col-sm-2 col-xl-1"
        />
        <label htmlFor="totalItems" className="col-form-label col">
          Total items
        </label>
      </div>

      <Pagination
        total={items.length}
      />
      <ul>
        {items.slice(firstItem - 1, lastItem)}
      </ul>
    </div>
  );
};

export default Home;
