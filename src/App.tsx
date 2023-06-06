import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './Pgination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const itemsInPages = items.slice(firstIndex, lastIndex);
  const pages = Math.ceil(items.length / perPage);
  const numbersPages = Array.from({ length: pages }, (_, index) => index + 1);

  const totalItems = items.length;
  const displayedItems = lastIndex > totalItems ? totalItems : lastIndex;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setCurrentPage(1);
    setPerPage(+value);
  };

  const prePage = () => {
    if (currentPage >= 1) {
      setCurrentPage(prevState => prevState - 1);
    }
  };

  const nextPage = () => {
    if (currentPage <= numbersPages.length) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstIndex + 1} - ${displayedItems} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChange}
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
        currentPage={currentPage}
        numbersPages={numbersPages}
        onPageChange={setCurrentPage}
        next={nextPage}
        prev={prePage}
      />

      <ul>
        {itemsInPages.map((item) => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
