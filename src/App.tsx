import React, { useCallback, useMemo, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map((n) => `Item ${n}`);

const perPageOptions: number[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[0]);

  const onPageChange = useCallback((page: number) => {
    setCurrent(page);
  }, []);

  const onPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setPerPage(+event.target.value);
      setCurrent(1);
    },
    [],
  );

  const lastVisibleItemIndex = useMemo(
    () => current * perPage,
    [current, perPage],
  );

  const firstVisibleItemIndex = useMemo(
    () => lastVisibleItemIndex - perPage,
    [lastVisibleItemIndex, perPage],
  );

  const itemsLength = useMemo(() => items.length, [items]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {current}
        {' '}
        (
        {`items ${firstVisibleItemIndex} - ${Math.min(lastVisibleItemIndex, itemsLength)} of ${itemsLength}`}
        )

      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => onPerPageChange(event)}
          >
            {perPageOptions.map((option) => (
              <option value={`${option}`} key={option}>
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
        total={itemsLength}
        perPage={perPage}
        currentPage={current}
        onChange={onPageChange}
      />

      <ul>
        {items
          .slice(firstVisibleItemIndex, lastVisibleItemIndex)
          .map((item) => (
            <li data-cy="item">
              Item
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
