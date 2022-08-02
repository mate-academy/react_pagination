import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import Pagination from './components/Pagination';

const pageItems = getNumbers(1, 42).map(n => `Item ${n}`);

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const firstPage = (page - 1) * itemsPerPage;
  const lastPage = pageItems.length < page * itemsPerPage
    ? pageItems.length
    : page * itemsPerPage;
  const showItems = pageItems.slice(firstPage, lastPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (Items ${firstPage + 1} - ${lastPage} of ${pageItems.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(+event.target.value);
              setPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          Items per page
        </label>
      </div>

      <Pagination
        total={pageItems.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onChangePage={setPage}
      />
      <ul>
        {showItems.map(item => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default App;
