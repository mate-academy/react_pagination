import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination/index';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const perPageParam = parseInt(searchParams.get('perPage') || '5', 10);

    setCurrentPage(pageParam);
    setPerPage(perPageParam);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString(), perPage: perPage.toString() });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.target.value, 10);

    setSearchParams({ page: '1', perPage: newPerPage.toString() });
  };

  const startIndex = (currentPage - 1) * perPage;
  const currentItems = items.slice(startIndex, startIndex + perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
