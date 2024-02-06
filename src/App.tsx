import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ArrayNumber } from './Types/ArrayNumber';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42);

const options: ArrayNumber = [3, 5, 10, 20];
const pages: ArrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function getPagesLength(array: ArrayNumber, number: number): ArrayNumber {
  switch (number) {
    case 5:
      return array.slice(0, 9);
    case 10:
      return array.slice(0, 5);
    case 20:
      return array.slice(0, 3);
    default:
      return array;
  }
}

function getItemsLength(
  current:number,
  itemsPerPage: number,
  array: ArrayNumber,
)
  : ArrayNumber {
  const startIndex = current * itemsPerPage - itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  switch (itemsPerPage) {
    case 3:
      return array.slice(startIndex, endIndex);
    case 5:
      return array.slice(startIndex, endIndex);
    case 10:
      return array.slice(startIndex, endIndex);
    default:
      return array.slice(startIndex, endIndex);
  }
}

export const App: React.FC = () => {
  const [selected, setSelected] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(+event.target.value);
    setCurrentPage(1);
  };

  const pagesToShow = getPagesLength(pages, selected);
  const itemsToShow = getItemsLength(currentPage, selected, items);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsToShow[0]} - ${itemsToShow[itemsToShow.length - 1]} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selected}
            onChange={handleChange}
          >
            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
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
        currentPage={currentPage}
        pagesToShow={pagesToShow}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <ul>
        {itemsToShow.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
