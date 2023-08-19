import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const total = items.length;

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const pageFromUrl = query.get('page') || '1';
  const perPageFromUrl = query.get('perPage') || '5';

  const [perPage, setPerPage] = useState(+perPageFromUrl);
  const [currentPage, setCurrentPage] = useState(+pageFromUrl);

  const maxItem = currentPage * perPage;
  const firstItem = maxItem - perPage;
  const lastItem = maxItem > total
    ? total
    : maxItem;

  const visibleItems = [...items.slice(firstItem, lastItem)];

  const selectItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);

    setPerPage(+event.target.value);
    setCurrentPage(1);
    navigate(`?page=1&perPage=${newPerPage}`);
  };

  const pageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}&perPage=${perPage}`);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={selectItemsPerPage}
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
        total={total} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={pageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
