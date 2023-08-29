import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

function getItems(
  listOfItems: string[],
  itemNumbers: string,
): string[][] {
  const result = [];
  let itemsPart = [];
  let count = 0;

  for (let i = 0; i < listOfItems.length; i += 1) {
    if (i === listOfItems.length - 1) {
      itemsPart.push(listOfItems[i]);
      result.push(itemsPart);
      break;
    }

    itemsPart.push(listOfItems[i]);
    count += 1;

    if (count === +itemNumbers) {
      result.push(itemsPart);
      itemsPart = [];
      count = 0;
    }
  }

  return result;
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);
  const groupedItems = getItems(items, perPage);
  const currentGroupOfItems = groupedItems[currentPage - 1];
  const fromItem = currentGroupOfItems[0].replace('Item ', '');
  const toItem
  = currentGroupOfItems[currentGroupOfItems.length - 1].replace('Item ', '');

  const handlePage = (elem: number) => {
    setCurrentPage(elem);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromItem} - ${toItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangeSelect}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePage}
      />
      <ul>
        {currentGroupOfItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
