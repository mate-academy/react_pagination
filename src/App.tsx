import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);
const total: number = items.length;

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(Number(searchParams.get('perPage')) || 5);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

  const startIndex: number = (currentPage - 1) * perPage;
  const endIndex: number = (currentPage * perPage > total) 
    ? total
    : currentPage * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
              setSearchParams({
                page: String(1),
                perPage: String(event.target.value),
              })
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          setSearchParams({
            page: String(page),
            perPage: String(perPage),
          })
        }}
      />

      <ul>
        {items.slice(startIndex, endIndex).map(item => {
          return <li key={item} data-cy="item">{item}</li>
        })}
      </ul>
    </div>
  );
};

export default App;
