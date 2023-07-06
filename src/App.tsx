import { useState } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const selectValues = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = items.length;
  const firstItem = itemsPerPage * (currentPage - 1) + 1;
  const lastItem = Math.min(itemsPerPage * currentPage, items.length);
  const itemsOnPage = getNumbers(firstItem, lastItem).map(n => `Item ${n}`);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleChangeSelect}
          >
            {selectValues.map((value: number) => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <ul>
        {itemsOnPage.map((item) => (
          <li data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
