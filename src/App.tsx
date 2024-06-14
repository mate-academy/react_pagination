import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPagination] = useState<string[]>(items);
  const [currPage, setCurrPage] = useState<number>(1);
  const [currPerPage, setCurrPerPage] = useState<number>(5);

  const lastItemsIndex = currPage * currPerPage;
  const firstItemIndex = lastItemsIndex - currPerPage;
  const currPageItems: string[] = itemsPagination.slice(
    firstItemIndex,
    lastItemsIndex,
  );

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrPerPage(+event.target.value);
    setCurrPage(1);
  };

  const paginate = (pageNumber: number) => setCurrPage(pageNumber);

  const last =
    lastItemsIndex > itemsPagination.length
      ? itemsPagination.length
      : lastItemsIndex;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currPage} (items {firstItemIndex + 1} - {last} of{' '}
        {itemsPagination.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={currPerPage}
            onChange={handleSelect}
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
        currPerPage={currPerPage}
        totalItems={itemsPagination.length}
        currentPage={currPage}
        paginate={paginate}
        setCurrPage={setCurrPage}
      />

      <ul>
        {currPageItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
