import React, { useEffect } from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import { getNumbers, getLastPage } from './utils';
import { Pagination } from './components/Pagination';

const ITEMS = getNumbers(1, 42).map(n => `Item ${n}`);
const PER_PAGE_VALUES = [3, 5, 10, 20];
const DEFAULT_PARAMS = {
  page: '1',
  perPage: '5',
};

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const total = ITEMS.length;
  const currentPage = Number(searchParams.get('page') || DEFAULT_PARAMS.page);
  const perPage = Number(searchParams.get('perPage') || DEFAULT_PARAMS.perPage);
  const lastPage = getLastPage(total, perPage);

  const fromIndex = currentPage * perPage - perPage;
  const toIndex = currentPage === lastPage ? total : currentPage * perPage;
  const ITEMSOnPage = ITEMS.slice(fromIndex, toIndex);

  useEffect(() => {
    if (currentPage < Number(DEFAULT_PARAMS.page)) {
      setSearchParams({
        ...searchParams,
        page: String(DEFAULT_PARAMS.page),
      });
    }

    if (currentPage > lastPage) {
      setSearchParams({
        ...searchParams,
        page: String(lastPage),
      });
    }

    if (!PER_PAGE_VALUES.includes(perPage)) {
      setSearchParams({
        ...searchParams,
        perPage: String(DEFAULT_PARAMS.perPage),
      });
    }
  }, [searchParams]);

  const onPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', event.target.value);
    searchParams.set('page', String(DEFAULT_PARAMS.page));
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
      <h1>ITEMS with Pagination</h1>

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
            {PER_PAGE_VALUES.map(perPageValue => (
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {ITEMSOnPage.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
