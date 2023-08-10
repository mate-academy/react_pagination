import React, { useState } from 'react';
import './App.css';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);
const totalItems = items.length;

const enum ValueSelect {
  THREE = 3,
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
}

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(ValueSelect.TEN);
  const [selectedPage, setSelectedPage] = useState(1);

  const startVisibleItem = (selectedPage * itemsPerPage) - itemsPerPage;
  const endVisibleItem = Math.min(startVisibleItem + itemsPerPage, totalItems);

  const handleSelectItems = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setSelectedPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page !== selectedPage) {
      setSelectedPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${startVisibleItem + 1} - ${endVisibleItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleSelectItems}
          >
            <option value={ValueSelect.THREE}>{ValueSelect.THREE}</option>
            <option value={ValueSelect.FIVE}>{ValueSelect.FIVE}</option>
            <option value={ValueSelect.TEN}>{ValueSelect.TEN}</option>
            <option value={ValueSelect.TWENTY}>{ValueSelect.TWENTY}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perItems={itemsPerPage}
        perPage={selectedPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {items
          .slice(startVisibleItem, endVisibleItem)
          .map(item => (
            <li
              data-cy={item}
              key={item}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
