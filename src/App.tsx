/* eslint-disable max-len */
import React, { useState } from 'react';
import './App.css';
import cn from 'classnames';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map((n, index) => ({ name: `Item ${n}`, id: index }));

enum SelectValue {
  THREE = 3,
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
}

export const App: React.FC = () => {
  const [pagesNumbers, setPagesNumbes] = useState(9);
  const [itemsPerPage, setItemsPerPAge] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const numberOfLinks = new Array(pagesNumbers)
    .fill(0).map((value, index) => ({ value, id: index + 1 }));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page 1 (items 1 - 5 of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={SelectValue.FIVE}
            onChange={(event) => {
              const value = +event.target.value;

              setItemsPerPAge(+event.target.value);
              setPagesNumbes(Math.ceil(items.length / value));
            }}
          >
            <option value={SelectValue.THREE}>{SelectValue.THREE}</option>
            <option value={SelectValue.FIVE}>{SelectValue.FIVE}</option>
            <option value={SelectValue.TEN}>{SelectValue.TEN}</option>
            <option value={SelectValue.TWENTY}>{SelectValue.TWENTY}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <ul className="pagination">
        <li className={cn('page-item', { disabled: selectedPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={selectedPage === 1 ? 'true' : 'false'}
            onClick={() => setSelectedPage(selectedPage - 1)}
          >
            «
          </a>
        </li>

        {numberOfLinks.map((item) => (
          <li className={cn('page-item', { active: selectedPage === item.id })} key={item.id}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item.id}`}
              onClick={() => setSelectedPage(item.id)}
            >
              {item.id}
            </a>
          </li>
        ))}

        <li className={cn('page-item', { disabled: selectedPage === pagesNumbers })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={selectedPage === pagesNumbers ? 'true' : 'false'}
            onClick={() => setSelectedPage(selectedPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice((selectedPage - 1) * itemsPerPage, selectedPage * itemsPerPage).map(item => (
          <li data-cy="item" key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
