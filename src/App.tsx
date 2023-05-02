import { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const total = 42;

  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const items: string[] = getNumbers(1, total).map(n => `Item ${n}`);
  const firstItem = (currentPage - 1) * perPage;
  const itemsPerPage = items.slice(firstItem, firstItem + perPage);

  const itemsFrom = (currentPage - 1) * perPage + 1;
  const itemsTo = currentPage * perPage;

  const selectOptions = [3, 5, 10, 20];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsFrom} - ${itemsTo > 42 ? 42 : itemsTo} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(element) => {
              setPerPage(Number(element.target.value));
              setCurrentPage(1);
            }}
          >
            {selectOptions.map((option) => {
              return (
                <option
                  key={option}
                  value={option}
                  selected={option === perPage}
                >
                  {option}
                </option>
              );
            })}
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
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ul>
        {itemsPerPage.map((item) => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
