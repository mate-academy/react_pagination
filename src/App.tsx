import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const total = 42;
const options = [3, 5, 10, 20];
const items = getNumbers(1, total)
  .map(n => n);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(options[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const perPageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value); // встановлюємо кількість елементів на сторінці
    setCurrentPage(1); // скидаємо на першу сторінку (за замовчуванням)
  };

  function getNumberOfPage() {
    return items.filter(number => {
      return +number > (currentPage * perPage) - perPage
        && +number <= currentPage * perPage;
    });
  }

  const pageItems = getNumberOfPage(); // створили масив з кількістю елементів сторінки

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${pageItems[0]} - ${pageItems[pageItems.length - 1]} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={perPageSelect}
          >
            {options.map((opt) => ( // оптимізуємо значення для вибору кількості елементів на сторінці
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ul>
        {pageItems.map(item => ( // оптимізуємо елемети сторінки
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
