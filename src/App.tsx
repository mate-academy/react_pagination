import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

// eslint - disable - next - line @typescript-eslint / no - unused - vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

enum PostProPage {
  THREE_PRO_PAGE = 3,
  FIVE_PRO_PAGE = 5,
  TEN_PRO_PAGE = 10,
  TWENTY_PRO_PAGE = 20,
}

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage]
    = useState<number>(PostProPage.FIVE_PRO_PAGE);
  const [curentPage, setCurentPage] = useState<number>(1);
  const pagesNumber = Math.ceil(items.length / itemPerPage);

  const handelOnPageChange = (newPage: number) => {
    setCurentPage(newPage);
  };

  const getItem = (
    curent: number,
    itemPer: number,
    total: number = items.length,
  ): string[] => {
    const itemsArr: string[] = [];
    const start: number = curent * itemPer - itemPer;
    const end: number = Math.min(curent * itemPer, total);

    for (let i = start; i < end; i += 1) {
      itemsArr.push(`Item ${i + 1}`);
    }

    return itemsArr;
  };

  const handelSetNumberOfItems
    = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setItemPerPage(+event.target.value);
      setCurentPage(1);
    };

  const curentStart = curentPage * itemPerPage - itemPerPage + 1;
  const curentEnd = curentPage < pagesNumber
    ? curentPage * getItem(curentPage, itemPerPage).length
    : items.length;
  const pagDescribe =
    `Page ${curentPage} (items ${curentStart} - ${curentEnd} of ${items.length})`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        {pagDescribe}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={PostProPage.FIVE_PRO_PAGE}
            onChange={handelSetNumberOfItems}
          >
            <option value={PostProPage.THREE_PRO_PAGE}>
              {PostProPage.THREE_PRO_PAGE}
            </option>
            <option value={PostProPage.FIVE_PRO_PAGE}>
              {PostProPage.FIVE_PRO_PAGE}
            </option>
            <option value={PostProPage.TEN_PRO_PAGE}>
              {PostProPage.TEN_PRO_PAGE}
            </option>
            <option value={PostProPage.TWENTY_PRO_PAGE}>
              {PostProPage.TWENTY_PRO_PAGE}
            </option>
          </select>
        </div>

        <label
          htmlFor="perPageSelector"
          className="col-form-label col"
        >
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={items.length}
        perPage={itemPerPage}
        currentPage={curentPage}
        onPageChange={handelOnPageChange}
      />
      <ul>
        {getItem(curentPage, itemPerPage).map((item) => {
          return (
            <li
              key={uuidv4()}
              data-cy="item"
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
