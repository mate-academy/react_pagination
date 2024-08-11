/* eslint-disable max-len */
import { ChangeEvent, useState } from 'react';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import './App.css';

type SelectValue = 3 | 5 | 10 | 20;

const selectOptions: SelectValue[] = [3, 5, 10, 20];

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<SelectValue>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const lastVisibleItems = perPage * currentPage;
  const firstVisibleItems = lastVisibleItems - perPage;

  const visibleItems = items.slice(firstVisibleItems, lastVisibleItems);

  const onPageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const onChangeSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value) as SelectValue);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {`${currentPage}`} (items {firstVisibleItems + 1} -{' '}
        {lastVisibleItems <= items.length ? lastVisibleItems : items.length} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={onChangeSelectValue}
          >
            {selectOptions.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
