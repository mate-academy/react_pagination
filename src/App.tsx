import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1', 10);
  const initialPerPage = parseInt(queryParams.get('perPage') || '5', 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', currentPage.toString());
    params.set('perPage', perPage.toString());

    navigate(`?${params.toString()}`, { replace: true });
  }, [currentPage, perPage, navigate]);

  function handlePageChange(page: number, newPerPage: number) {
    setCurrentPage(page);
    setPerPage(newPerPage);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {perPage * (currentPage - 1) + 1} -{' '}
        {perPage * currentPage > items.length
          ? items.length
          : perPage * currentPage}{' '}
        of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value))
              setCurrentPage(1);
            }
            }
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
        onPageChange={handlePageChange}
      />

      <ul className="pagination-column">
        {Array.from(
          {
            length:
              currentPage === Math.ceil(items.length / perPage)
                ? items.length - (currentPage - 1) * perPage
                : perPage,
          },
          (_, index) => (
            <li data-cy="item" key={index}>
              Item {perPage * (currentPage - 1) + index + 1}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default App;
