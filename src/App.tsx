import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const perPageSize = searchParams.get('perPageSize') || 5;

  const total = items.length;
  const startOfPage = currentPage * itemsPerPage - itemsPerPage;
  const endOfPage = currentPage * itemsPerPage > total
    ? total
    : currentPage * itemsPerPage;
  const partOfItems = getNumbers(startOfPage + 1, endOfPage).map(n => `Item ${n}`);

  useEffect(() => {
    setItemsPerPage(Number(perPageSize));
    setCurrentPage(Number(page));
  }, [perPageSize, page]);

  const onChangePerPage = (pageSize: number) => {
    navigate(`?page=${1}&perPageSize=${pageSize}`);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startOfPage + 1} - ${endOfPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              onChangePerPage(Number(event.currentTarget.value));
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
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onChangePerPage}
      />

      <ul>
        {partOfItems.map((item) => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
