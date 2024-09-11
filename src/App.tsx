import React, { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

enum ItemsPerPage {
  three = 3,
  five = 5,
  ten = 10,
  twenty = 20,
}

export const App: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(ItemsPerPage.five);
  const [currentPage, onPageChange] = useState(1);

  const itemsOnPage = items.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage,
  );

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });
  }, [currentPage, perPage, setSearchParams]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items{' '}
        {itemsOnPage[0].split(' ')[1] && itemsOnPage[0].split(' ')[1]} -{' '}
        {itemsOnPage[itemsOnPage.length - 1].split(' ')[1] &&
          itemsOnPage[itemsOnPage.length - 1].split(' ')[1]}{' '}
        of {items.length})
      </p>

      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={e => {
          onPageChange(1);
          setPerPage(+e.target.value);
        }}
      >
        <option value={ItemsPerPage.three}>{ItemsPerPage.three}</option>
        <option value={ItemsPerPage.five}>{ItemsPerPage.five}</option>
        <option value={ItemsPerPage.ten}>{ItemsPerPage.ten}</option>
        <option value={ItemsPerPage.twenty}>{ItemsPerPage.twenty}</option>
      </select>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        itemsOnPage={itemsOnPage}
      />

      <ul>
        {itemsOnPage.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
