import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPage, setItemPage] = useState(5);

  const total = items.length;
  const firstItem = (currentPage - 1) * itemPage;
  const lastItem = (firstItem + itemPage) < total
    ? firstItem + itemPage : total;

  const preparedItem = [...items].slice(firstItem, lastItem);

  const selectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setItemPage(+event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPage}
            onChange={selectChange}
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
        total={total}
        currentPage={currentPage}
        perPage={itemPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {preparedItem.map(item => (
        <ul key={item}>
          <li data-cy="item">{`${item}`}</li>
        </ul>
      ))}

    </div>
  );
};

export default App;
