import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export enum ElementsPerPage {
  three = 3,
  five = 5,
  ten = 10,
  twenty = 20,
}

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [elemsPerPage, setElemsPerPage] = useState(ElementsPerPage.five);
  const navigate = useNavigate();
  const lastPage: number = +items.length;
  let itemsAndPage: string[] = [];

  function getElentsPerPageInUrl(value: number) {
    navigate(`?page=${page}&perPage=${value}`);
  }

  if (page === 1) {
    itemsAndPage = items.slice(0, elemsPerPage);
  } else {
    itemsAndPage = items.slice(
      (page - 1) * elemsPerPage,
      Math.min(elemsPerPage * page, lastPage),
    );
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      {page === 1 ? (
        <p className="lead" data-cy="info">
          Page {page} (items {1} - {elemsPerPage * page} of {items.length})
        </p>
      ) : (
        <p className="lead" data-cy="info">
          Page {page}
          &nbsp;(items {(page - 1) * elemsPerPage + 1}
          &nbsp;- {Math.min(elemsPerPage * page, lastPage)}
          &nbsp;of {items.length})
        </p>
      )}

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPage(1);
              setElemsPerPage(+event.target.value);
              getElentsPerPageInUrl(+event.target.value);
            }}
          >
            <option value="3">{ElementsPerPage.three}</option>
            <option value="5" selected>
              {ElementsPerPage.five}
            </option>
            <option value="10">{ElementsPerPage.ten}</option>
            <option value="20">{ElementsPerPage.twenty}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={elemsPerPage}
        currentPage={page}
        onPageChange={(currentPage: number) => {
          setPage(currentPage);
        }}
      />
      <ul>
        {itemsAndPage.map((item, index) => {
          return (
            <li data-cy="item" key={index}>
              {item}
            </li>
          );
        })}
      </ul>
      <Routes>
        <Route
          path={`?page=${page}&perPage=${elemsPerPage}`}
          element={<App />}
        />
      </Routes>
    </div>
  );
};

export default App;
