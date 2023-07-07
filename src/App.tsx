import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const perPageOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalItems = items.length;
  const firstItem = currentPage !== 1 ? (currentPage - 1) * perPage : 0;
  const lastItem = (currentPage * perPage) > totalItems
    ? totalItems
    : currentPage * perPage;

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={handlePerPageChange}
          >
            {perPageOptions.map(item => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ul>
        {items.slice(firstItem, lastItem).map(item => {
          return (
            <li data-cy="item" key={item}>{item}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
