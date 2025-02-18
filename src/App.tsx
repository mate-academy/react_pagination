import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  // Оновлюємо значення для відображення елементів
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number =
    startIndex + itemsPerPage < items.length
      ? startIndex + itemsPerPage
      : items.length;

  // Функція для зміни перPage
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Після зміни перPage обов'язково повертаємось на першу сторінку
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endIndex} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={ev => handleItemsPerPageChange(Number(ev.target.value))}
            value={itemsPerPage}
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
        onPageChange={value => {
          setCurrentPage(Number(value));
        }}
      />

      <ul>
        {items
          .filter((_, i) => i >= startIndex && i < startIndex + itemsPerPage)
          .map(item => (
            <li data-cy="item" key={item}>{`${item}`}</li>
          ))}
      </ul>
    </div>
  );
};

export default App;
