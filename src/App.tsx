import { useState } from 'react';
import * as React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState('5');
  const [selectedPage, setSelectedPage] = useState(1);

  const handlerSelectedPage = (numb: number) => {
    setSelectedPage(numb);
  };

  const maxPage = Math.ceil(items.length / +itemsPerPage);

  const title = `Page ${selectedPage} (items ${(selectedPage - 1) * +itemsPerPage + 1} - ${Math.min(+itemsPerPage * selectedPage, items.length)} of ${items.length})`;

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
            value={itemsPerPage}
            onChange={e => {
              setSelectedPage(1);
              setItemsPerPage(e.target.value);
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
        itemsPerPage={itemsPerPage}
        selectedPage={selectedPage}
        maxPage={maxPage}
        handlerSelectedPage={handlerSelectedPage}
      />
    </div>
  );
};

export default App;
