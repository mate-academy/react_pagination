import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './App.css';
import { getNumbers, preperedItems } from './utils';
import { Pagination } from './components/Pagination';

const itemsList = getNumbers(1, 42).map(n => `Item ${n}`);
const total = itemsList.length;
const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchParams, setSearchParams] = useSearchParams();

  const { visibleItems, startItem, endItem } = preperedItems(
    itemsList,
    perPage,
    currentPage,
  );

  useEffect(() => {
    const pageFromUrl = searchParams.get('page');
    const perPageFromUrl = searchParams.get('perPage');

    if (pageFromUrl) {
      setCurrentPage(+pageFromUrl);
    }

    if (perPageFromUrl) {
      setPerPage(+perPageFromUrl);
    }
  }, [searchParams]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({
      page: String(page),
      perPage: String(perPage),
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(+event.target.value);
    setSearchParams({
      page: '1',
      perPage: event.target.value,
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${total})`}
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
            {options.map(option => (
              <option value={`${option}`} key={option}>
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
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
