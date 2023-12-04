import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const perPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(() => event.target.value);
    setCurrentPage(1);
  };

  const henderItens = () => {
    return items.slice((currentPage - 1) * Number(itemsPerPage),
      (currentPage) * Number(itemsPerPage))
      .map((item) => (
        <li data-cy="item" key={item}>{item}</li>
      ));
  };

  const startItem = (currentPage - 1) * Number(itemsPerPage) + 1;
  let lastItem = currentPage * Number(itemsPerPage);

  if (lastItem > items.length) {
    lastItem = items.length;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem}`
   + ` - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={perPage}
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
        total={items}
        perPage={Number(itemsPerPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {henderItens()}
      </ul>
    </div>
  );
};

export default App;
