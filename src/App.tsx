import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const pageChanged = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPageChanged = (itemsPP: number) => {
    setCurrentPage(1);
    setItemsPerPage(itemsPP);
  };

  const indexFrom = itemsPerPage * currentPage - itemsPerPage;
  let indexTo = itemsPerPage * currentPage - 1;

  indexTo = indexTo > items.length ? items.length - 1 : indexTo;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexFrom + 1} - ${indexTo + 1} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => itemsPerPageChanged(parseInt(e.target.value, 10))}
            value={itemsPerPage}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => pageChanged(page)}
      />

      <ul>
        {items.slice(indexFrom, indexTo + 1).map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
