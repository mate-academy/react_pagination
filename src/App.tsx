import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { getItemsOnPage } from './utils/pagination/getItemsOnPage';
import { getItemsOnPageCount } from './utils/pagination/getItemsOnPageCount';
import { Pagination } from './components/Pagination';
import { EPaginationSize } from './enums/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<EPaginationSize>(
    EPaginationSize.Medium,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const perPageSizeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = +e.target.value;

    if (pageSize === perPage) return;

    setPerPage(pageSize);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => setCurrentPage(+page);

  const [first, last] = getItemsOnPageCount(currentPage, perPage, items);

  const itemsOnPage = getItemsOnPage(items, currentPage, perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {first} - {last} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={perPageSizeHandler}
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
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {itemsOnPage.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
