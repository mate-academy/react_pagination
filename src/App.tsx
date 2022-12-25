import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const total = items.length;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfTheLastPage = Math.ceil(total / perPage);
  const itemsOnTheLasPage = total % perPage || perPage;

  const itemsOnPage = Array<string>(
    numberOfTheLastPage === currentPage ? itemsOnTheLasPage : perPage,
  )
    .fill('Item ')
    .map((item, index) => (
      item + (perPage * currentPage - perPage + index + 1)
    ));

  const firstItemOnPage = itemsOnPage[0]
    .slice(itemsOnPage[0].indexOf(' ') + 1);
  const lastItemOnPage = itemsOnPage[itemsOnPage.length - 1]
    .slice(itemsOnPage[0].indexOf(' ') + 1);

  const pageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
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
        onPageChange={pageChange}
      />
      <ul>
        {itemsOnPage.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
