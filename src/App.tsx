import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination, getAmountOfPages } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

const perPageDefaultValue = 5;

enum SearchParamName {
  PerPage = 'perPage',
  Page = 'page',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const getPerPage = (searchParams: URLSearchParams): number => {
  const pagination = parseInt(
    searchParams.get(SearchParamName.PerPage) || `${perPageDefaultValue}`,
  );

  return pagination > 0 ? pagination : perPageDefaultValue;
};

const getPage = (
  searchParams: URLSearchParams,
  amountOfPages: number,
): number => {
  const page = parseInt(searchParams.get(SearchParamName.Page) || '1');

  if (isNaN(page) || page < 1) {
    return 1;
  }

  if (page > amountOfPages) {
    return amountOfPages;
  }

  return page;
};

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = getPerPage(searchParams);
  const currentPage = getPage(
    searchParams,
    getAmountOfPages(items.length, perPage),
  );

  const onPageChange = function (page: number) {
    if (page > 0 && page <= getAmountOfPages(items.length, perPage)) {
      setSearchParams(params => {
        if (page === 1) {
          params.delete(SearchParamName.Page);
        } else {
          params.set(SearchParamName.Page, page.toString());
        }

        return params;
      });
    }
  };

  const handlePerPageChange = function (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const newPerPage = event.currentTarget.value;

    if (+newPerPage > 0) {
      setSearchParams(params => {
        params.delete(SearchParamName.Page);

        if (+newPerPage === perPageDefaultValue) {
          params.delete(SearchParamName.PerPage);
        } else {
          params.set(SearchParamName.PerPage, newPerPage);
        }

        return params;
      });
    }
  };

  const getFirstItemOnCurrentPage = function (): number {
    return (currentPage - 1) * perPage + 1;
  };

  const getLastItemOnCurrentPage = function (): number {
    const lastItem = (currentPage - 1) * perPage + perPage;

    return lastItem > items.length ? items.length : lastItem;
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {getFirstItemOnCurrentPage()} -{' '}
        {getLastItemOnCurrentPage()} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {items
          .slice(getFirstItemOnCurrentPage() - 1, getLastItemOnCurrentPage())
          .map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
