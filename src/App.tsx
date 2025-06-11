import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

/*Створюється масив ['Item 1', 'Item 2', ..., 'Item 42'] — 42 елементи.*/
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  /** скільки елементів показувати на сторінці (за замовчуванням 5)*/
  const [currentPage, setCurrentPage] = useState<number>(1);
  /*яка сторінка зараз активна (починаємо з 1)*/

  const totalItems = items.length;
  /** скільки всього елементів. */
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  /* скільки всього сторінок (округлено вгору).*/

  const visibleItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  /*Вираховується підмасив елементів, які треба показати на поточній сторінці*/

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); /*скидаємо на першу сторінку*/
  };
  /*При зміні select ми оновлюємо itemsPerPage і скидаємо сторінку до 1*/

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
            onChange={handleItemsPerPageChange}
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
