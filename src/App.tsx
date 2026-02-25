import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// type PerPage = '3' | '5' | '10' | '20';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const total: number = items.length;

export const App: React.FC = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [selectedNum, setSelectedNum] = useState('5');
  // const perPage: number = Number(selectedNum);

  const [searchParams, setSearchParams] = useSearchParams();
  // зчитуємо з URL або використовуємо дефолт
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const perPageFromUrl = Number(searchParams.get('perPage')) || 5;
  const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
  const [selectedNum, setSelectedNum] = useState<string>(
    String(perPageFromUrl),
  );
  const perPage = Number(selectedNum);

  // Синхронізуємо URL коли currentPage або perPage змінюються
  useEffect(() => {
    // Записуємо тільки валідні значення
    setSearchParams({
      page: String(currentPage),
      perPage: String(perPage),
    });
  }, [currentPage, perPage, setSearchParams]);
  // Якщо користувач змінив URL вручну — синхронізуємо state
  useEffect(() => {
    const p = Number(searchParams.get('page')) || 1;
    const pp = Number(searchParams.get('perPage')) || 5;

    // Оновлюємо state лише якщо URL відрізняється (щоб уникнути зациклення)
    if (p !== currentPage) {
      setCurrentPage(p);
    }

    if (String(pp) !== selectedNum) {
      setSelectedNum(String(pp));
    }
  }, [searchParams]);

  const startIdx: number = 1 + perPage * (currentPage - 1);
  const finishIdx: number = Math.min(total, currentPage * perPage);

  const currentItems: string[] = items.filter((_, idx) => {
    return idx >= startIdx - 1 && idx <= finishIdx - 1;
  });

  const selectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNum(event.target.value);
    setCurrentPage(1);
  };

  const onPageChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIdx} - {finishIdx} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedNum}
            onChange={selectorChange}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {currentItems.map((item, idx) => {
          return (
            <li data-cy="item" key={idx}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
