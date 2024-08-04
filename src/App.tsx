import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ListItems } from './components/ListItems';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const defaultItemPerPage = 5;
const defaultPage = 1;

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || defaultPage;
  const itemsPerPage =
    Number(searchParams.get('perPage')) || defaultItemPerPage;
  const pagesNumber = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    if (!searchParams.get('page') || !searchParams.get('perPage')) {
      setSearchParams({
        page: `${currentPage}`,
        perPage: `${itemsPerPage}`,
      });
    }
  }, []);

  const startIndexOnCurrentPage = (currentPage - 1) * itemsPerPage;
  const endIndexOnCurrentPage =
    currentPage < pagesNumber ? currentPage * itemsPerPage : items.length;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndexOnCurrentPage + 1} -{' '}
        {endIndexOnCurrentPage} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={defaultItemPerPage}
            onChange={e => {
              const perPage = e.target.value;

              setSearchParams({
                page: `${defaultPage}`,
                perPage: perPage,
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

      <Pagination
        total={pagesNumber}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setSearchParams}
      />
      <ListItems
        items={items}
        startIndex={startIndexOnCurrentPage}
        endIndex={endIndexOnCurrentPage}
      />
    </div>
  );
};

export default App;
