import { useState } from 'react';
import * as React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPageItems, setPerPageItems] = useState('5');
  const [selectedPage, setSelectedPage] = useState(1);

  const handlerSelectedPage = (numb: number) => {
    setSelectedPage(numb);
  };

  const maxPage = Math.ceil(items.length / +perPageItems);

  const title =
    selectedPage === 1
      ? `Page ${selectedPage} (items 1 - ${+perPageItems * selectedPage} of 42)`
      : `Page ${selectedPage} (items ${(selectedPage - 1) * +perPageItems + 1} - ${Math.min(+perPageItems * selectedPage, items.length)} of ${items.length})`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {title}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageItems}
            onChange={e => {
              setSelectedPage(1);
              setPerPageItems(e.target.value);
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
        items={items}
        perPageItems={perPageItems}
        selectedPage={selectedPage}
        maxPage={maxPage}
        handlerSelectedPage={handlerSelectedPage}
      />
    </div>
  );
};

export default App;
