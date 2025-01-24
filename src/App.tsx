import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialPage = Number(params.get('page') || 1);
  const initialPerPage = Number(params.get('perPage') || 5);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const startIndex = (currentPage - 1) * perPage;
  const visibleItems = items.slice(startIndex, startIndex + perPage);

  useEffect(() => {
    const newParams = new URLSearchParams();

    newParams.set('page', currentPage.toString());
    newParams.set('perPage', perPage.toString());
    navigate(`?${newParams.toString()}`);
  }, [currentPage, perPage, navigate]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} -{' '}
        {Math.min(startIndex + perPage, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
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
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map((item, index) => (
          <li key={`${index}`} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
