import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

interface RenderingPages {
  partOfPage: string[];
  before: number;
  to: number;
}

export const App: React.FC = () => {
  const [count, setCount] = useState(1);
  const [pages, setPages] = useState(5);

  const minPage = count * pages - (pages - 1);
  const maxPage = count * pages > items.length ? items.length : count * pages;

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPages(+event.target.value);
    setCount(1);
  };

  const pageChange = (num: number) => setCount(num);

  const renderPerPage = ({ partOfPage, before, to }: RenderingPages) => {
    const slicedItems = partOfPage.slice(before, to);

    return slicedItems.map(item => (
      <li data-cy="item" key={item}>
        {item}
      </li>
    ));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {count} (items {minPage} - {maxPage} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
            value={pages}
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
        total={items.length}
        perPage={pages}
        currentPage={count}
        onPageChange={page => {
          pageChange(page);
        }}
      />

      <ul>
        {renderPerPage({
          partOfPage: items,
          before: minPage - 1,
          to: maxPage,
        })}
      </ul>
    </div>
  );
};

export default App;
