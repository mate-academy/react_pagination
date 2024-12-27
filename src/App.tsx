import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const items = 42;
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialPerPage = Number(searchParams.get('perPage')) || 5;

  const [perPage, setPerPage] = useState(initialPerPage);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, items);

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });
  }, [currentPage, perPage, setSearchParams]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${start} - ${end} of ${items})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={event => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
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
        total={items}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          if (page !== currentPage) {
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
};

export default App;
