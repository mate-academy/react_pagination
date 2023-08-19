import React, { useState } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';
import { getFirstItemGroup, getLastItemGroup } from './utils';

const total = 42;

export const App: React.FC = () => {
  const options = [
    { value: 3, text: '3' },
    { value: 5, text: '5' },
    { value: 10, text: '10' },
    { value: 20, text: '20' },
  ];

  const [countItems, setCountItems] = useState(options[1].value);
  const [currentPage, setCurrentPage] = useState(1);

  const handChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountItems(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${getFirstItemGroup(currentPage, countItems, total) + 1} - ${getLastItemGroup(currentPage, countItems, total)} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={countItems}
            onChange={handChange}
          >
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.text}
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
        perPage={countItems}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          if (page > 0 && Math.ceil(total / countItems)) {
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
};

export default App;
