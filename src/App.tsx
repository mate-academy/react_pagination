import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [activeTab, setActiveTab] = useState<number>(1);

  // Вычисление индексов для текущей страницы
  const fromItem: number = (activeTab - 1) * itemsPerPage;
  const toItem = Math.min(activeTab * itemsPerPage, 42);

  // Фильтруем элементы для текущей страницы
  const currentPageItems = items.slice(fromItem, toItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activeTab} (items ${fromItem + 1} - ${toItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => {
              const newItemsPerPage = Number(e.target.value);

              setItemsPerPage(newItemsPerPage);
              setActiveTab(1);
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
        total={42}
        perPage={itemsPerPage}
        currentPage={activeTab}
        onPageChange={setActiveTab} // Передаём обработчик смены страницы
      />

      <ul>
        {currentPageItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
