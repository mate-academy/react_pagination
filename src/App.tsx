import React, { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';

const ITEMS = 42;
const DEFAULT_PER_PAGE = 5;

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );

  const [currentPerPage, setPerPage] = useState(
    Number(searchParams.get('perPage')) || DEFAULT_PER_PAGE
  );

  const getPagesValue = () => currentPage * currentPerPage;

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = +event.target.value;
    setPerPage(newPerPage);
    setCurrentPage(1);
    setSearchParams({page: "1", perPage: String(newPerPage)});
  };

  // const handlePageChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
  //   const page = Number(event.currentTarget.textContent);

  //   setCurrentPage(page);
  //   setSearchParams({ page: String(page), perPage: String(currentPerPage) });
  // };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({
      page: String(page),
      perPage: String(currentPerPage),
    });
  };

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    const perPage = Number(searchParams.get('perPage')) || DEFAULT_PER_PAGE;

    setCurrentPage(page);
    setPerPage(perPage);
  }, [searchParams]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${getPagesValue() - (currentPerPage - 1)} - ${getPagesValue() < ITEMS ? getPagesValue() : ITEMS} of ${ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
            defaultValue={currentPerPage}
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
        total={ITEMS}
        currentPerPage={currentPerPage}
        activePage={currentPage}
        // setActivePage={setCurrentPage}
        // setSearchParams={setSearchParams}
        onPageChange={handlePageChange}
      />
      <ul>
        {getNumbers(
          getPagesValue() - (currentPerPage - 1),
          getPagesValue() < ITEMS ? getPagesValue() : ITEMS,
        ).map(n => {
          return (
            <li data-cy="item" key={n}>
              Item {n}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
