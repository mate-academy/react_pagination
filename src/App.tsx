import { FC, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const defaultPage = 1;
const items = getNumbers(1, 42);

export const App: FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const totalItems = items.length;
  const displayedItems = items.slice(
    itemsPerPage * (currentPage - 1),
    itemsPerPage * (currentPage),
  );
  const firstItem = displayedItems[0];
  const lastItem = displayedItems[displayedItems.length - 1];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {displayedItems.length > 1 ? (
          `Page ${currentPage} (items ${firstItem} - ${lastItem} of ${totalItems})`
        ) : (
          `Page ${currentPage} (item ${firstItem} of ${totalItems})`
        )}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.target.value));
              setCurrentPage(defaultPage);
            }}
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
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {displayedItems.map(n => (
          <li data-cy="item" key={`item-${n}`}>
            {`Item ${n}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
