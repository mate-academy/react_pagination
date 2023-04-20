import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPage = +(searchParams.get('page') || 1);
  const searchPerPage = +(searchParams.get('perPage') || 5);
  const perPageValues = [3, 5, 10, 20];

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const newPerPage = event.currentTarget.value;

    if (+newPerPage !== searchPerPage) {
      setSearchParams({ page: '1', perPage: newPerPage });
    }
  };

  const handleClick = (page: number) => {
    if (page !== searchPage) {
      setSearchParams({ page: `${page}`, perPage: `${searchPerPage}` });
    }
  };

  const totalItems = 42;
  const firstItemPerPage = (searchPage - 1) * searchPerPage + 1;
  const lastItemPerPage = (
    searchPage * searchPerPage > totalItems
      ? totalItems
      : searchPage * searchPerPage
  );
  const items = getNumbers(firstItemPerPage, lastItemPerPage)
    .map(n => `Item ${n}`);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${searchPage} (items ${firstItemPerPage} - ${lastItemPerPage} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={searchPerPage}
            onChange={handleChange}
          >

            {perPageValues.map(val => (
              <option key={val} value={`${val}`}>{val}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={searchPerPage}
        currentPage={searchPage}
        onPageChange={handleClick}
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
