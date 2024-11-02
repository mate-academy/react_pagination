import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const getItemNum = (item: string): number => {
  const idx = item.indexOf(' ');
  return +item.slice(idx);
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);


  const total: number = items.length;
  const lastItemIndex: number = currentPage * perPage;
  const firstItemIndex: number = lastItemIndex - perPage;
  const itemsOnPage: string[] = items.slice(firstItemIndex, lastItemIndex)



  const onOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  }


  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${getItemNum(itemsOnPage[0])} - ${getItemNum(itemsOnPage[itemsOnPage.length - 1])} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={onOptionChange}
          >
            {[3, 5, 10, 20].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination total={total} perPage={perPage} currentPage={currentPage} onPageChange={onPageChange} />
      <ul>
        {itemsOnPage.map(item =>
          <li data-cy="item" key={item}>
            {item}
          </li>
        )}
      </ul>
    </div>
  );
};

export default App;
