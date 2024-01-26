import React, { useState } from 'react';
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
  const arrOfPages: string[][] = [];
  const [itemPerPage, setItemPerPage] = useState(PostProPage.FIVE_PRO_PAGE);
  const [curentPage, setCurentPage] = useState(1);
  const pagesNumber = Math.ceil(items.length / itemPerPage);
  const handelOnPageChange = (newPage: number) => {
    setCurentPage(newPage);
  }

  for (let i = 1; i <= pagesNumber; i += 1) {
    arrOfPages.push([]);
    for (let j: number = i * itemPerPage - itemPerPage; j < i * itemPerPage && j < items.length; j += 1) {
      arrOfPages[i - 1].push(`Item ${j + 1}`);
    }
  }

  const handelSetNumberOfItems = (event: any) => {
    setItemPerPage(event.target.value);
    setCurentPage(1)
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {curentPage} (items {curentPage * itemPerPage - itemPerPage + 1} - {
          curentPage < pagesNumber ?
            curentPage * arrOfPages[curentPage - 1].length :
            items.length
        } of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handelSetNumberOfItems}
          >
            <option value={PostProPage.THREE_PRO_PAGE}>{PostProPage.THREE_PRO_PAGE}</option>
            <option selected value={PostProPage.FIVE_PRO_PAGE}>{PostProPage.FIVE_PRO_PAGE}</option>
            <option value={PostProPage.TEN_PRO_PAGE}>{PostProPage.TEN_PRO_PAGE}</option>
            <option value={PostProPage.TWENTY_PRO_PAGE}>{PostProPage.TWENTY_PRO_PAGE}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
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
        {arrOfPages[curentPage - 1].map((item, index) => {
          return (
            <li
              key={index}
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
