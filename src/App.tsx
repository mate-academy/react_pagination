import React, {
  useState, memo, useMemo, useCallback,
} from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(numbers => `Item ${numbers}`);

export const App: React.FC = memo(() => {
  const total = items.length;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const lastItemOnPage = Math.min(perPage * currentPage, total);
  const firstItemOnPage = perPage * (currentPage - 1) + 1;
  const itemsPerPage = useMemo(
    () => getNumbers(firstItemOnPage, lastItemOnPage),
    [firstItemOnPage, lastItemOnPage],
  );

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page&nbsp;
        {currentPage}&nbsp;
        (
          items&nbsp;
        {firstItemOnPage}&nbsp;
        -&nbsp;
        {lastItemOnPage}&nbsp;
        of&nbsp;
        {total}
        )
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangePerPage}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {itemsPerPage.map(item => (
          <li data-cy="item" key={item}>
            Item {item}&nbsp;
          </li>
        ))}
      </ul>
    </div>
  );
});

export default App;
