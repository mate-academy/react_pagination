import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [itemsOnPage, setitemsOnPage] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [startValue, setStartValue] = useState(1);
  const [endValue, setEndvalue] = useState(itemsOnPage);
  const totalAmount = 42;
  const items = getNumbers(1, 42);

  const changeCurrentPage = (selectedPage: number) => {
    setActivePage(selectedPage);
    setStartValue(selectedPage * itemsOnPage - itemsOnPage + 1);
    setEndvalue(selectedPage * itemsOnPage);
  };

  // const changePageByArrow = (direction: string, selectedPage: number) => {
  //   if (direction === 'back') {
  //     setActivePage(selectedPage - 1);
  //     setStartValue((selectedPage - 1) * itemsOnPage - itemsOnPage + 1);
  //     setEndvalue((selectedPage - 1) * itemsOnPage);
  //   } else {
  //     setActivePage(selectedPage + 1);
  //     setStartValue((selectedPage + 1) * itemsOnPage - itemsOnPage + 1);
  //     setEndvalue((selectedPage + 1) * itemsOnPage);
  //   }
  // };

  const calculateTotalPages = (allItems: number) => {
    const amount = Math.ceil(totalAmount / allItems);

    return getNumbers(1, amount);
  };

  const amountOfPages = calculateTotalPages(itemsOnPage);

  function createContent() {
    return items.slice(startValue - 1, endValue);
  }

  function changePages(event: React.ChangeEvent<HTMLSelectElement>) {
    setitemsOnPage(+event.target.value);
    setActivePage(1);
    setEndvalue(+event.target.value);
    setStartValue(1);
  }

  const currentContent = createContent();

  const currentFromValue = currentContent[0];
  const currentToValue = currentContent[currentContent.length - 1];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${currentFromValue} - ${currentToValue} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={changePages}
            value={itemsOnPage}
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
        currentPage={activePage}
        totalPages={amountOfPages}
        onPageChange={(selectedPage) => changeCurrentPage(selectedPage)}
      />
      <ul>
        {currentContent.map(item => (
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
