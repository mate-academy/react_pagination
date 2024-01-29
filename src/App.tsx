import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const options = [3, 5, 10, 20];

const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, items.length);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = +e.target.value;

    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const getNumberOfElements = (total: number): number[] => {
    const elementsOnPage: number[] = [];

    const startElement = (currentPage - 1) * perPage + 1;
    const endElement = Math.min(currentPage * perPage, total);

    for (let i = startElement; i <= endElement; i += 1) {
      elementsOnPage.push(i);
    }

    return elementsOnPage;
  };

  const elementsOnPage = getNumberOfElements(items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex} - ${endIndex} of ${items.length})`}
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
            {options.map((value) => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}
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
        onPageChange={setCurrentPage}
      />

      <ul>
        {elementsOnPage.map(element => (
          <li
            key={element}
            data-cy="item"
          >
            {`Item ${element}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
