import React, { useEffect } from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const perPageValues = [3, 5, 10, 20];
const defaultSearchParams = {
  page: '1',
  perPage: '5',
};

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);

  const total = items.length;
  const currentPage = Number(searchParams.get('page'));
  const perPage = Number(searchParams.get('perPage'));
  const maxPages = Math.ceil(total / perPage);

  const fromIndex = currentPage * perPage - perPage;
  const toIndex = currentPage === maxPages ? total : currentPage * perPage;
  const itemsOnPage = items.slice(fromIndex, toIndex);

  useEffect(() => {
    if (currentPage < 1) {
      searchParams.set('page', defaultSearchParams.page);
    }

    if (currentPage > maxPages) {
      searchParams.set('page', `${maxPages}`);
    }

    if (perPage === 0 || !perPageValues.includes(perPage)) {
      searchParams.set('perPage', defaultSearchParams.perPage);
    }

    setSearchParams(searchParams);
  }, [searchParams]);

  const onPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', event.target.value);
    searchParams.set('page', defaultSearchParams.page);
    setSearchParams(searchParams);
  };

  const onPageChange = (page: number) => {
    if (page !== currentPage) {
      searchParams.set('page', String(page));
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromIndex + 1} - ${toIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={onPerPageChange}
          >
            {perPageValues.map(perPageValue => (
              <option
                key={perPageValue}
                value={perPageValue}
              >
                {perPageValue}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={Number(searchParams.get('perPage'))}
        currentPage={Number(searchParams.get('page'))}
        onPageChange={onPageChange}
      />

      <ul>
        {itemsOnPage.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
