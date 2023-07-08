import { useState } from 'react';
import { getNumbers, pagination, selectValues } from './utils';
import { Pagination } from './components/Pagination';
import './App.css';

const items = getNumbers(1, 42);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(pagination.page);
  const [itemsPerPage, setItemsPerPage] = useState(pagination.items);

  const totalItems = items.length;
  const firstItem = itemsPerPage * (currentPage - 1) + 1;
  const lastItem = Math.min(itemsPerPage * currentPage, totalItems);
  const itemsOnPage = getNumbers(firstItem, lastItem).map(n => `Item ${n}`);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
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
            {Object.keys(selectValues).map((key) => (
              <option
                key={key}
                value={selectValues[key]}
              >
                {selectValues[key]}
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
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
