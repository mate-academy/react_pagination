import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const pageQueryParam = queryParams.get('page');
  const perPageQueryParam = queryParams.get('perPage');

  const [perPage, setPerPage] = useState(
    perPageQueryParam ? parseInt(perPageQueryParam, 10) : 5,
  );
  const [currentPage, setCurrentPage] = useState(
    pageQueryParam ? parseInt(pageQueryParam, 10) : 1,
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    queryParams.set('page', String(page));
    navigate({ search: queryParams.toString() });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const perPageValue = parseInt(event.target.value, 10);

    setPerPage(perPageValue);
    queryParams.set('perPage', String(perPageValue));
    queryParams.set('page', '1');
    navigate({ search: queryParams.toString() });
  };

  useEffect(() => {
    if (pageQueryParam) {
      setCurrentPage(parseInt(pageQueryParam, 10));
    }
  }, [pageQueryParam]);

  const total = items.length;
  const maxPage = perPage * currentPage;
  const startPage = maxPage - perPage;
  const endPage = maxPage > total ? total : maxPage;

  const visiblePages = items.slice(startPage, endPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startPage + 1} - ${endPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
            value={perPage}
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
        onPageChange={changePage}
      />

      <ul>
        {visiblePages.map((item) => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
