import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const items = getNumbers(1, 42)
//   .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [state, setState] = useState({
    perPage: 5,
    currentPage: 1,
  });

  const arrOfItemsForCurrPage = (
    sum: number,
    sumOfPosPerPage: number,
    currPage: number,
  ) => {
    const startPosition = currPage === 1
      ? 1
      : sumOfPosPerPage * currPage - sumOfPosPerPage + 1;

    let finalPosition = sumOfPosPerPage * currPage;

    if (finalPosition > sum) {
      finalPosition = sum;
    }

    const arrayOfItems = getNumbers(startPosition, finalPosition);

    return arrayOfItems;
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;

    setState({
      perPage: +value,
      currentPage: 1,
    });
  };

  const handlePage = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    const { dataset } = event.currentTarget;

    setState({
      ...state,
      currentPage: Number(dataset.value),
    });
  };

  const { perPage, currentPage } = state;

  const currentItems = arrOfItemsForCurrPage(42, perPage, currentPage);

  const start = currentItems[0];

  const end = currentItems[(currentItems.length - 1)];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${start} - ${end} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            name="perPage"
            value={`${perPage}`}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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
        total={42} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        arrOfItems={currentItems}
        onPageChange={handlePage}
      // onPageChange={(page) => { ... }}
      />
    </div>
  );
};

export default App;
