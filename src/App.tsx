import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const perPageOptions: number[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);
  const [paginationButtons, setPaginationButtons] = useState<number[]>(
    getNumbers(1, Math.ceil(items.length / itemsOnPage)),
  );

  const firstItemOnPage = selectedPage * itemsOnPage - itemsOnPage + 1;
  const lastItemOnPage = selectedPage === paginationButtons.length
    ? items.length
    : selectedPage * itemsOnPage;

  const onPageChange = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.id === 'prevLink'
    && selectedPage !== 1
    ) {
      setSelectedPage(selectedPage - 1);
    } else if (event.currentTarget.id === 'nextLink'
    && selectedPage !== paginationButtons.length
    ) {
      setSelectedPage(selectedPage + 1);
    } else {
      setSelectedPage(+event.currentTarget.innerText);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {
          `Page ${selectedPage} `
          + `(items ${firstItemOnPage}`
          + ` - ${lastItemOnPage} of ${items.length})`
        }
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsOnPage}
            onChange={(event) => {
              setItemsOnPage(+event.target.value);
              setPaginationButtons(
                getNumbers(1, Math.ceil(items.length / +event.target.value)),
              );
              setSelectedPage(1);
            }}
          >
            {perPageOptions.map(option => (
              <option key={option} value={option}>
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
        perPage={itemsOnPage}
        allItems={items}
        onPageChange={onPageChange}
        paginationButtons={paginationButtons}
        selectedPage={selectedPage}
      />
    </div>
  );
};

export default App;
