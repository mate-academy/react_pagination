import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers, paginationUtils } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const totalEl = items.length;
  const startEl = (currentPage - 1) * perPage + 1;
  const endEl = Math.min(currentPage * perPage, totalEl);
  const visibleEl = paginationUtils(items, perPage, currentPage);

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({
      page: pageNumber.toString(),
      perPage: perPage.toString(),
    });
  };

  return (
    <>
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          Page {currentPage} (items {startEl} - {endEl} of {totalEl})
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
              value={perPage}
              onChange={e => {
                setSearchParams({
                  page: '1',
                  perPage: e.target.value,
                });
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

        <ul>
          {visibleEl.map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Pagination
        total={totalEl}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></Pagination>
    </>
  );
};

export default App;
