import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const quantityPerPage = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(quantityPerPage[1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsVisible, setItemsVisible] = useState(items);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = itemsPerPage * currentPage;

    setItemsVisible(items.slice(start, end));
  }, [itemsPerPage, currentPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemsVisible[0].split(' ')[1]} -{' '}
        {itemsVisible[itemsVisible.length - 1].split(' ')[1]} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setItemsPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            {quantityPerPage.map(quantityOption => (
              <option
                id={quantityOption.toString()}
                key={quantityOption}
                value={quantityOption}
                onSelect={() => setItemsPerPage(quantityOption)}
                selected={quantityOption === 5 && true}
              >
                {quantityOption}
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
        onPageChange={setCurrentPage}
      />

      <ul>
        {itemsVisible.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
