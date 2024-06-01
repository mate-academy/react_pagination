import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, getCurrentPage] = useState(1);
  const [itemsPerPage, getItemsPerPage] = useState(5); // кількість елементів на сторінці
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // eslint-disable-next-line prettier/prettier
  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => { // Кількость елементів на сторінці
    getItemsPerPage(Number(event.target.value));
    getCurrentPage(1);
  };

  // eslint-disable-next-line prettier/prettier
  const changePage = (pages: number) => { // Зміна сторінки
    if (pages >= 1 && pages <= totalPages) {
      getCurrentPage(pages);
    }
  };

  // eslint-disable-next-line prettier/prettier
  const currentItems = items.slice( // Поточна сторінка
    (currentPage - 1) * itemsPerPage,
    Math.min(currentPage * itemsPerPage),
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * itemsPerPage + 1} -{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handlePerPageChange}
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
        total={totalPages}
        currentPage={currentPage}
        onPageChange={changePage}
      />

      {/* Move this markup to Pagination */}
      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
