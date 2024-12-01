import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Arrow } from './components/Arrow';
import { Select } from './components/Select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const paginationAmount = Math.ceil(items.length / perPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPerPageChenge = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  const startItem = (currentPage - 1) * perPage;

  const lastItem =
    startItem + perPage < items.length ? startItem + perPage : items.length;

  const currentItems = [...items].splice(startItem, perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${lastItem} of ${items.length})`}
      </p>

      <Select perPage={perPage} onPerPageChenge={onPerPageChenge} />

      <ul className="pagination">
        <Arrow
          icon={'«'}
          test={'prevLink'}
          href={'#prev'}
          condition={currentPage === 1}
          onPageChange={() =>
            currentPage !== 1 && onPageChange(currentPage - 1)
          }
        />

        <Pagination
          total={items}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />

        <Arrow
          icon={'»'}
          test={'nextLink'}
          href={'#next'}
          condition={currentPage === paginationAmount}
          onPageChange={() =>
            currentPage !== paginationAmount && onPageChange(currentPage + 1)
          }
        />
      </ul>

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
