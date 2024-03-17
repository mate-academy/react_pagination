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

  const title = selectedPage === 1 ? `Page ${selectedPage} (items 1 - ${+perPageItems * selectedPage} of 42)` : `Page ${selectedPage} (items ${((selectedPage - 1) * +perPageItems) + 1} - ${Math.min(+perPageItems * selectedPage, items.length)} of ${items.length})`;

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

      {/* Move this markup to Pagination */}
      <Pagination
        items={items}
        perPageItems={perPageItems}
        selectedPage={selectedPage}
        maxPage={maxPage}
        handlerSelectedPage={handlerSelectedPage}
      />
      {/* <ul className="pagination">
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true">
            «
          </a>
        </li>
        <li className="page-item active">
          <a data-cy="pageLink" className="page-link" href="#1">
            1
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#2">
            2
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#3">
            3
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#4">
            4
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#5">
            5
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#6">
            6
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#7">
            7
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#8">
            8
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#9">
            9
          </a>
        </li>
        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false">
            »
          </a>
        </li>
      </ul>
      <ul>
        <li data-cy="item">Item 1</li>
        <li data-cy="item">Item 2</li>
        <li data-cy="item">Item 3</li>
        <li data-cy="item">Item 4</li>
        <li data-cy="item">Item 5</li>
      </ul> */}
    </div>
  );
};

export default App;
