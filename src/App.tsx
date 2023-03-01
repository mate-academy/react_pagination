import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

import './App.css';

const ITEMS_PER_PAGE_OPTIONS = [3, 5, 10, 20];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}&perPage=${perPage}`);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
    navigate(`?page=1&perPage=${+event.target.value}`);
  };

  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = startIndex + perPage - 1 > total
    ? total
    : startIndex + perPage - 1;
  const partOfItems = getNumbers(startIndex, endIndex).map(n => `Item ${n}`);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get('page');
    const perPageParam = searchParams.get('perPage');

    if (pageParam) {
      const pageValue = +pageParam;

      setCurrentPage(pageValue);
    }

    if (perPageParam) {
      const perPageValue = +perPageParam;

      setPerPage(perPageValue);
    }
  }, [location]);

  useEffect(() => {
    setTotal(items.length);
  }, [items]);

  useEffect(() => {
    navigate(`?page=${currentPage}&perPage=${perPage}`);
  }, [currentPage, perPage, navigate]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex} - ${endIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            {ITEMS_PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
        {partOfItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
