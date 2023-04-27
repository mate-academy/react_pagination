import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const itemsLength = items.length;
const selectOptionsValues = [3, 5, 10, 20];

export const App: React.FC = () => {
  const params = { page: '1', perPage: '5' };
  const [searchParams, setSearchParams] = useSearchParams(params);
  const pageQuery = Number(searchParams.get('page'));
  const perPageQuery = Number(searchParams.get('perPage'));
  const lastNumber = Math.min(perPageQuery * pageQuery, itemsLength);
  const sliceItems = (countPerPage: number, page: number) => {
    const end = page * countPerPage;
    const start = end - countPerPage;

    return [...items].slice(start, end);
  };

  const [visibleItems, setVisibleItems]
    = useState(sliceItems(perPageQuery, pageQuery));
  const firstNumber = lastNumber - visibleItems.length + 1;
  const handleItems = (count: number, page: number) => {
    params.page = page.toString();
    params.perPage = count.toString();
    setSearchParams(params);
    setVisibleItems(sliceItems(count, page));
  };

  const onPageChange = (page: number) => {
    params.page = page.toString();
    setSearchParams(params);
    handleItems(perPageQuery, page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pageQuery} (items ${firstNumber} - ${lastNumber} of ${itemsLength})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageQuery}
            onChange={(event) => {
              const newCountPerPage = Number(event.target.value);

              params.perPage = newCountPerPage.toString();
              params.page = '1';
              setSearchParams(params);
              handleItems(newCountPerPage, 1);
            }}
          >
            {
              selectOptionsValues.map(value => (
                <option value={value} key={value}>{value}</option>
              ))
            }
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={itemsLength}
        perPage={perPageQuery}
        currentPage={pageQuery}
        onPageChange={onPageChange}
      />

      <ul>
        {
          visibleItems.map((item) => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
