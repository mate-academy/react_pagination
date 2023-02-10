import React, { useCallback, useMemo, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = 42;
  const items = getNumbers(1, total)
    .map(n => `Item ${n}`);

  const indexOfLastItem = useMemo(() => {
    const index = currentPage * perPage;

    if (index > total) {
      return total;
    }

    return index;
  }, [currentPage, perPage, total]);

  const indexOfFirstItem = useMemo(() => {
    return (currentPage - 1) * perPage;
  }, [perPage, currentPage]);

  const itemsPerPage = useMemo(() => (
    items.slice(indexOfFirstItem, indexOfLastItem)),
  [indexOfFirstItem, indexOfLastItem]);

  const handleChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPerPage(+e.target.value);
      setCurrentPage(1);
    }, [setPerPage, setCurrentPage],
  );

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexOfFirstItem + 1} - ${indexOfLastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangeSelect}
            autoComplete="off"
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handleChangePage}
      />

      <ul>
        {itemsPerPage.map(item => (
          <li
            data-cy="item"
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
