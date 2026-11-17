import React, { ChangeEvent } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const DEFAULT_PER_PAGE = 5;

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const itemsPerPage = searchParams.get('perPage') || DEFAULT_PER_PAGE;
  const maxItemOnPage =
    (Number(currentPage) - 1) * Number(itemsPerPage) + Number(itemsPerPage);
  const minItemOnPage = (Number(currentPage) - 1) * Number(itemsPerPage) + 1;

  const handlePerPageQueryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const param = new URLSearchParams(searchParams);

    param.set('perPage', e.target.value);
    param.set('page', '1');
    setSearchParams(param);
  };

  const handlePageQueryChange = (page: string) => {
    const param = new URLSearchParams(searchParams);

    param.set('page', page);
    setSearchParams(param);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {minItemOnPage} -{' '}
        {maxItemOnPage > items.length ? items.length : maxItemOnPage} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              handlePageQueryChange('1');
              handlePerPageQueryChange(e);
            }}
            value={itemsPerPage}
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
        perPage={Number(itemsPerPage)}
        currentPage={Number(currentPage)}
        onPageChange={page => {
          handlePageQueryChange(page.toString());
        }}
      />

      <ul>
        {[...items]
          .splice(
            (Number(currentPage) - 1) * Number(itemsPerPage),
            Number(itemsPerPage),
          )
          .map(item => (
            <li data-cy="item" key={item}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
