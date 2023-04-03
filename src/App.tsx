import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const getArrOfItemsForCurrPage = (
    sum: number,
    sumOfPosPerPage: number,
    currPage: number,
  ) => {
    const startPosition = currPage === 1
      ? 1
      : sumOfPosPerPage * currPage - sumOfPosPerPage + 1;

    const finalPosition = sumOfPosPerPage * currPage > sum
      ? sum
      : sumOfPosPerPage * currPage;

    const arrayOfItems = getNumbers(startPosition, finalPosition);

    return arrayOfItems;
  };

  const handleAmountOfItems = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { value } = event.target;

    setCurrentPage(1);
    setPerPage(+value);
  };

  const handlePage = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    const { dataset } = event.currentTarget;

    setCurrentPage(Number(dataset.value));
  };

  const currentItems = getArrOfItemsForCurrPage(42, perPage, currentPage);

  const startPos = currentItems[0];

  const endPos = currentItems[(currentItems.length - 1)];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startPos} - ${endPos} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            name="perPage"
            value={`${perPage}`}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleAmountOfItems}
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
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        arrOfItems={currentItems}
        onPageChange={handlePage}
      />
    </div>
  );
};

export default App;
