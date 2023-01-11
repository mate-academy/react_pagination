import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemNumbes] = useState<string[]>(items);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = ((page: number) => {
    setCurrentPage(page);
  });

  const changeItemPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const indexOfFirst = perPage * (currentPage - 1);

  const visibleItems = itemNumbes.filter((_, index) => {
    return index >= indexOfFirst && index < indexOfFirst + perPage;
  });

  const indexOfLast = itemNumbes.indexOf(visibleItems[visibleItems.length - 1]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexOfFirst + 1} - ${indexOfLast + 1} of ${itemNumbes.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={changeItemPerPage}
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
        total={itemNumbes.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map(item => <li key={item} data-cy="item">{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
