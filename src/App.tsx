import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageFromUrl = Number(searchParams.get('page')) || 1;
  const perPageFromUrl = Number(searchParams.get('perPage')) || 5;

  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);
  const [perPage, setPerPage] = useState(perPageFromUrl);

  const perPageOptions = [3, 5, 10, 20];
  const startIndex = currentPage === 1 ? 0 : currentPage * perPage - perPage;
  const endIndex = currentPage * perPage;
  const filteredItems = items.slice(startIndex, endIndex);
  const itemsLength = items.length;
  const pagesNum = Math.ceil(itemsLength / perPage);

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);

    setPerPage(newPerPage);

    setCurrentPage(1);

    setSearchParams({ page: '1', perPage: String(newPerPage) });
  };

  const onPageChange = (page: number) => {
    if (page < 1 || page > pagesNum) {
      return;
    }

    setCurrentPage(page);

    setSearchParams(params => ({ ...params, page: String(page) }));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex > itemsLength ? itemsLength : endIndex} of ${itemsLength})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue={perPage}
            onChange={handleItemsPerPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
          >
            {perPageOptions.map(option => (
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
        total={pagesNum}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {filteredItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
