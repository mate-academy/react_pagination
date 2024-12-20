import React from 'react';
import { useState } from 'react';
import './App.css';
import { getNumbers, getPages, getArrayItems, getItemsForPrint } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

type PageChangeEvent =
  | React.ChangeEvent<HTMLSelectElement>
  | React.MouseEvent<HTMLAnchorElement>;
// console.log(itemsForPrint);

interface PaginationRrops {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (event: PageChangeEvent) => void;
}

const Pagination: React.FC<PaginationRrops> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const newItems = getArrayItems(items, perPage);
  const buttons = getPages(newItems);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            data-action="prev"
            aria-disabled={currentPage === buttons[0]}
            data-value={currentPage - 1}
            onClick={event => {
              if (currentPage > 1) {
                onPageChange(event);
              }
            }}
          >
            «
          </a>
        </li>
        {buttons.map((button: number, index: number) => (
          <li
            className={`page-item ${button === currentPage ? 'active' : ''}`}
            key={index}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${button}`}
              data-value={button}
              onClick={onPageChange}
            >
              {button}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === buttons.length ? 'disabled' : ''
          }`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            data-action="next"
            aria-disabled={currentPage === buttons.length}
            data-value={currentPage + 1}
            onClick={currentPage !== buttons.length ? onPageChange : undefined}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {total.map((item: string, index: number) => (
          <li data-cy="item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export const App: React.FC = () => {
  const [selectValue, setSelectValue] = useState(5);
  const [buttonValue, setButtontValue] = useState(1);
  const newItems = getArrayItems(items, selectValue);
  const itemsForPrint = getItemsForPrint(newItems, buttonValue);
  const buttons = getPages(newItems);
  const handlePageChange = (event: PageChangeEvent) => {
    if (event.type === 'change') {
      const target = event.target as HTMLSelectElement;
      const value = parseInt(target.value, 10);

      setSelectValue(value);
      setButtontValue(1);

      return;
    }

    if (event.type === 'click') {
      event.preventDefault();
      const target = event.target as HTMLAnchorElement;
      const action = target.getAttribute('data-action');
      const value = parseInt(target.getAttribute('data-value') || '0', 10);

      if (action === 'prev' && buttonValue > 1) {
        setButtontValue(buttonValue - 1);
      } else if (action === 'next' && buttonValue < buttons.length) {
        setButtontValue(buttonValue + 1);
      } else if (!action) {
        setButtontValue(value);
      }
    }
  };

  const indexSpace = itemsForPrint[0].indexOf(' ');

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {buttonValue} (items{itemsForPrint[0]?.slice(indexSpace)} -
        {itemsForPrint[itemsForPrint.length - 1].slice(indexSpace)} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={selectValue}
            className="form-control"
            onChange={handlePageChange}
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
        total={itemsForPrint}
        perPage={selectValue} // number of items per page
        currentPage={buttonValue} /* optional with 1 by default */
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
