import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = React.useState<number>(5);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsListSize = items.length;

  function onPerPageChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {`${currentPage * perPage - perPage + 1}`} -{' '}
        {`${currentPage < Math.ceil(itemsListSize / perPage) ? currentPage * perPage : itemsListSize}`}{' '}
        of {`${itemsListSize}`})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={onPerPageChange}
            value={perPage}
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
        perPage={perPage}
        total={itemsListSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {items
          .slice((currentPage - 1) * perPage, currentPage * perPage)
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
