import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { PaginationInfo } from './components/PaginationInfo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: number[] = getNumbers(1, 42).map(n => n);

const perPageOptions = [3, 5, 10, 20].map((el, i) => {
  return { id: i, val: el };
});

interface PageItem {
  id: number;
  val: number;
}

export const App: React.FC = () => {
  function buildPagesContainer(
    itms: number[],
    chunkSize: number,
  ): PageItem[][] {
    const contArr: PageItem[][] = [];
    let globId = 0;

    if (!chunkSize) {
      return [];
    }

    for (let i = 0; i < itms.length; i += chunkSize) {
      const chunk = itms.slice(i, i + chunkSize);
      const subCont = [];

      for (let i2 = 0; i2 < chunk.length; i2++) {
        subCont.push({ id: globId, val: chunk[i2] });
        globId++;
      }

      contArr.push(subCont);
    }

    return contArr;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[1].val);
  const pagesContainer = buildPagesContainer(items, perPage);
  const currentPageContainer = pagesContainer[currentPage - 1];

  function handlePageSelection(pageNum: number): void {
    if (pageNum && pageNum <= pagesContainer.length) {
      setCurrentPage(pageNum);
    }
  }

  function handlePagePerSelection(val: any) {
    setCurrentPage(1);
    setPerPage(parseInt(val.target.value));
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <PaginationInfo
        total={items.length}
        currentPage={currentPage}
        firstItem={currentPageContainer[0].val}
        lastItem={currentPageContainer[currentPageContainer.length - 1].val}
      />

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePagePerSelection}
            defaultValue={5}
          >
            {perPageOptions.map(p => (
              <option key={p.id} value={`${p.val}`}>
                {p.val}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageSelection}
      />

      <ul>
        {currentPageContainer.map(pg => {
          return (
            <li key={pg.id} data-cy="item">
              {`Item ${pg.val}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
