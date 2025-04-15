import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

type ItemsPerPage = 3 | 5 | 10 | 20;
const itemsPerPageOptions: ItemsPerPage[] = [3, 5, 10, 20];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = React.useState<ItemsPerPage>(5);
  const [currentPage, setCurrentPage] = React.useState(1);

  const updateItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = parseInt(event.currentTarget.value) as ItemsPerPage;

    setItemsPerPage(selectValue);
    setCurrentPage(1);
  };

  const updateCurrentPage = (pageNumber: number) => {
    const countPages = Math.ceil(items.length / itemsPerPage);

    if (pageNumber > 0 && pageNumber <= countPages) {
      setCurrentPage(pageNumber);
    }
  };

  const itemsFrom = (currentPage - 1) * itemsPerPage;
  const itemsTo = Math.min(currentPage * itemsPerPage, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemsFrom + 1} - {itemsTo} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={itemsPerPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={updateItemsPerPage}
          >
            {itemsPerPageOptions.map(number => (
              <option value={number} key={number}>
                {number}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page: number) => updateCurrentPage(page)}
      />

      <ul>
        {items.slice(itemsFrom, itemsTo).map(el => (
          <li data-cy="item" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
