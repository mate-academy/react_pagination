import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const DEFAULT_SELECTED_PAGE_NUMBER = 1;

const ItemsPerPage = {
  THREE: 3,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
};

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPerPage, setCurrentPerPage] = useState(ItemsPerPage.FIVE);
  const [selectedPage, setSelectedPage] = useState<number>(
    DEFAULT_SELECTED_PAGE_NUMBER,
  );

  const itemsLength = items.length;
  const startIndex = currentPerPage * selectedPage - currentPerPage;
  const endIndex = currentPerPage * selectedPage;

  const perPageItems = [...items].slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${startIndex + 1} - ${endIndex > itemsLength ? itemsLength : endIndex} of ${itemsLength})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={event => {
              setCurrentPerPage(Number(event.target.value));
              setSelectedPage(DEFAULT_SELECTED_PAGE_NUMBER);
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={ItemsPerPage.FIVE}
          >
            {Object.values(ItemsPerPage).map(value => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={itemsLength}
        perPage={currentPerPage}
        currentPage={selectedPage}
        onPageChange={(pageNumber: number) => setSelectedPage(pageNumber)}
      />
      <ul>
        {perPageItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
