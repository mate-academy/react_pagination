import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { PagList } from './components/PagList/PagList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const visibleItems = [...items];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const pagination = Math.ceil(items.length / itemsPerPage);
  const pages = getNumbers(1, pagination);
  const startItem = (currentPage - 1) * itemsPerPage;

  const currentItems = [...visibleItems].splice(startItem, itemsPerPage);

  function pageChange(value: number) {
    setCurrentPage(value);
  }

  const handleItemsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${startItem + currentItems.length} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleItemsChange}
            defaultValue={'5'}
          >
            <option value="3">3</option>
            <option value="5"> 5 </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <PagList
        //items={currentItems}
        goods={pages}
        currentPage={currentPage}
        pageChange={pageChange}
        pagination={pagination}
      />

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
