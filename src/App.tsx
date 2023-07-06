import React, { useState } from 'react';
import './App.css';
import cn from 'classnames';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [itemsOnPage, setitemsOnPage] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [startValue, setStartValue] = useState(1);
  const [endValue, setEndvalue] = useState(itemsOnPage);
  const totalAmount = 42;
  const items = getNumbers(1, 42);

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

      <ul className="pagination">
        <li className={cn('page-item', { disabled: activePage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={activePage !== 1
              ? 'false'
              : 'true'}
            onClick={() => {
              if (activePage !== 1) {
                setActivePage(activePage - 1);
                setStartValue((activePage - 1) * itemsOnPage - itemsOnPage + 1);
                setEndvalue((activePage - 1) * itemsOnPage);
              }
            }}
          >
            «
          </a>
        </li>
        {amountOfPages.map(item => (
          <li
            className={cn('page-item', { active: activePage === item })}
            key={item}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => {
                setActivePage(item);
                setStartValue(item * itemsOnPage - itemsOnPage + 1);
                setEndvalue(item * itemsOnPage);
              }}
            >
              {item}
            </a>
          </li>
        ))}

        <li className={cn('page-item', {
          disabled: activePage === amountOfPages.length,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={activePage !== amountOfPages.length
              ? 'false'
              : 'true'}
            onClick={() => {
              if (activePage !== amountOfPages.length) {
                setActivePage(activePage + 1);
                setStartValue((activePage + 1) * itemsOnPage - itemsOnPage + 1);
                setEndvalue((activePage + 1) * itemsOnPage);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
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
