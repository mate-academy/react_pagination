import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemNumbers = [...items.slice(indexOfFirstItem, indexOfLastItem)];

  // const itemNumbers = [];

  // for (let i = 1; i <= itemsPerPage; i++) {
  //   itemNumbers.push(i);
  // }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexOfFirstItem + 1} - ${indexOfLastItem > items.length ? items.length : indexOfLastItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={(event) => {
              setItemsPerPage(parseInt(event.target.value, 10));
              setCurrentPage(1);
            }}
            value={itemsPerPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
      <ul>
        {itemNumbers.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
