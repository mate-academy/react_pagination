import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useSearchParams } from 'react-router';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

type Pages = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Pages>(1);
  const [perPage, setPerPage] = useState<3 | 5 | 10 | 20>(3);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams('?page=1&perPage=5');

  const numPages: number = Math.ceil(items.length / perPage);
  const startIndex: number = Math.abs((currentPage - 1) * perPage) + 1;
  const endIndex: number = startIndex + perPage - 1;
  const visibleItems: string[] = items.slice(startIndex - 1, endIndex);

  return (
    <>
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          Page {currentPage} (items {startIndex} -{' '}
          {currentPage === numPages ? items.length : endIndex} of {items.length}
          )
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              onChange={event => {
                const newPerPage = Number(event.target.value);

                if (newPerPage !== perPage) {
                  setPerPage(() => Number(newPerPage));
                  setCurrentPage(1);
                  setSearchParams(`?page=${currentPage}&perPage=${newPerPage}`);
                }
              }}
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
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
          numPages={numPages}
          currentPage={currentPage}
          onPageChange={newPage => {
            if (newPage !== currentPage) {
              setCurrentPage(newPage);
              setSearchParams(`?page=${newPage}&perPage=${perPage}`);
            }
          }}
        />
        <ul>
          {visibleItems.map(item => {
            return (
              <React.Fragment key={item}>
                <li data-cy="item">{item}</li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default App;
