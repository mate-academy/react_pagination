import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState('5');
  const [currPage, setCurrPage] = useState(1);
  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setItemsPerPage(event.currentTarget.value);
    setCurrPage(1);
  };

  const totalPages = 42;
  const firstItemPerPage = (currPage - 1) * +itemsPerPage + 1;
  const lastItemPerPage = (
    currPage * +itemsPerPage > totalPages
      ? totalPages
      : currPage * +itemsPerPage
  );
  const items = getNumbers(firstItemPerPage, lastItemPerPage)
    .map(n => `Item ${n}`);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currPage} (items ${firstItemPerPage} - ${lastItemPerPage} of ${totalPages})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleChange}
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

      {/* <Routes>
        <Route
          path="/"
          element={(
            <Pagination
              total={totalPages}
              perPage={+itemsPerPage}
              currentPage={currPage}
              onPageChange={(page) => setCurrPage(page)}
            />
          )}
        />
      </Routes> */}

      <Pagination
        total={totalPages}
        perPage={+itemsPerPage}
        currentPage={currPage}
        onPageChange={(page) => setCurrPage(page)}
      />

      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
