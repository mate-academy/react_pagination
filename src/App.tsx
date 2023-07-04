import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line import/no-cycle
import Routes from './Routes';

const numberOfItems = 42;
const items: string[] = getNumbers(1, numberOfItems)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPages
  = Math.ceil(numberOfItems / perPage);

  const firstItemIndex = (currentPage - 1) * perPage;

  const lastItemIndex = Math.min((currentPage * perPage), numberOfItems);

  const visibleItems = () => {
    return items.slice(firstItemIndex, lastItemIndex);
  };

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    const perPageParam = searchParams.get('perPage');

    const parsedPage = pageParam ? parseInt(pageParam, 10) : 1;
    const parsedPerPage = perPageParam ? parseInt(perPageParam, 10) : 10;

    setCurrentPage(parsedPage);
    setPerPage(parsedPerPage);
  }, [location]);

  return (
    <div className="container">
      <Routes />
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemIndex} of ${numberOfItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => {
              setPerPage(+e.target.value);
              setCurrentPage(1);
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

      <Pagination
        total={numberOfPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems().map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
