import { ChangeEvent, useState } from 'react';
import { Pagination } from './components/Pagination';
import './App.css';
import { getNumbers } from './utils';

const countItems = 42;

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countItemsPerPage, setCountItemsPerPage] = useState(3);

  const handlerChangeCountPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const fromItem = 1 + (currentPage - 1) * countItemsPerPage;
  const toItem = currentPage === Math.ceil(countItems / countItemsPerPage)
    ? countItems
    : currentPage * countItemsPerPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} `
          + `(items ${fromItem} `
          + `- ${toItem}`
          + ` of ${countItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={countItemsPerPage}
            onChange={handlerChangeCountPerPage}
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
        total={countItems}
        perPage={countItemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {getNumbers(fromItem, toItem).map(n => (
          <li key={n} data-cy="item">{`Item ${n}`}</li>
        ))}
      </ul>
    </div>
  );
};
