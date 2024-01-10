// import cn from 'classnames';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const START_COUNT_ITEMS = 1;
const END_COUNT_ITEMS = 42;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(START_COUNT_ITEMS, END_COUNT_ITEMS)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selectedCountPerPage, setSelectedCountPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    const perPage = searchParams.get('perPage');

    if (page) {
      setCurrentPage(+page);
    }

    if (perPage) {
      setSelectedCountPerPage(perPage);
    }
  }, [location.search]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      navigate(`?page=${page}&perPage=${selectedCountPerPage}`);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountPerPage = event.target.value;

    navigate(`?page=1&perPage=${newCountPerPage}`);
  };

  const getFirstItemIndexOnPage = (page: number) => {
    return (page - 1) * +selectedCountPerPage;
  };

  const getLastItemIndexOnPage = (page: number) => {
    if (page * +selectedCountPerPage > items.length) {
      return items.length;
    }

    return page * +selectedCountPerPage;
  };

  const firstItemIndex = getFirstItemIndexOnPage(currentPage);
  const lastItemIndex = getLastItemIndexOnPage(currentPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} `
        + `(items ${firstItemIndex + 1} - `
        + `${lastItemIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedCountPerPage}
            onChange={handleSelectChange}
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
        perPage={+selectedCountPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {items
          .filter((_, index) => {
            return index >= firstItemIndex
            && index < lastItemIndex;
          })
          .map(item => (
            <li
              key={item}
              data-cy="item"
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
