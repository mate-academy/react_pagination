import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42);

const getPageRange = (allItems: number[], selectedFilter: string) => {
  const numberOfPages = Math.ceil(allItems.length / parseFloat(selectedFilter));
  const pages = getNumbers(1, numberOfPages);

  return pages;
};

const activeList = (
  selectedFilter: string,
  activePage: number,
  allItems: number[],
): [number[], string] => {
  let visibleItems: number[] = [];
  const selectedFilterToNumber = +selectedFilter;

  visibleItems = allItems.slice(
    activePage * selectedFilterToNumber - selectedFilterToNumber,
    activePage * selectedFilterToNumber,
  );

  const rangeList = `${visibleItems[0]} - ${visibleItems[visibleItems.length - 1]} of ${allItems.length}`;

  return [visibleItems, rangeList];
};

export const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('5');
  const [activePage, setActivePage] = useState(1);

  const pagesRange = getPageRange(items, selectedValue);

  const [visibleItems, rangeList]
   = activeList(selectedValue, activePage, items);

  const onClickForward = () => {
    setActivePage(activePage + 1);
  };

  const onClickBack = () => {
    setActivePage(activePage - 1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${rangeList})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedValue}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setActivePage(1);

              return setSelectedValue(e.currentTarget.value);
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
        currentPage={activePage}
        onPageChange={setActivePage}
        onClickForward={onClickForward}
        onClickBack={onClickBack}
        pagesRange={pagesRange}
        visibleItems={visibleItems}
      />
    </div>
  );
};

export default App;
