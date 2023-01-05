import React, { useState } from 'react';
import './App.css';
// import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const items = getNumbers(1, 42)
//   .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentpage] = useState(1);
  const [perPage, setPerpage] = useState(5);
  const [total] = useState(42);
  const [fromINumber, setFromNumber] = useState(1);
  const [toNumber, setTonumber] = useState(perPage);

  const onpageChange = (page: number): void => {
    if (currentPage !== page) {
      setCurrentpage(page);
    }
  };

  const getArrayOfNumbersOfItemsPerPage = (
    numberOfItems: number,
    currentPageNumber: number,
    totalNumber: number,
  ): number[] => {
    const numbers = [];
    const from = numberOfItems * currentPageNumber - numberOfItems + 1;
    const to = numberOfItems * currentPageNumber > totalNumber
      ? totalNumber : numberOfItems * currentPageNumber;

    setFromNumber(from);
    setTonumber(to);

    for (let n = from; n <= to; n += 1) {
      numbers.push(n);
    }

    return numbers;
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromINumber} - ${toNumber} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => {
              setPerpage(+e.target.value);
              setCurrentpage(1);
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
        onPageChange={onpageChange}
        getArrayItems={getArrayOfNumbersOfItemsPerPage}
      />
    </div>
  );
};

export default App;
