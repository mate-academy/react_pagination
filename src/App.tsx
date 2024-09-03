import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { PaginationInfo } from './components/PaginationInfo';

const items: number[] = Array.from({ length: 42 }, (_, el) => el + 1);

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

    if (typeof chunkSize !== 'number' || chunkSize <= 0) {
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
  const [perPage, setPerPage] = useState(5);
  const pagesContainer = buildPagesContainer(items, perPage);
  const currentPageContainer = pagesContainer[currentPage - 1];

  function handlePageSelection(pageNum: number): void {
    if (pageNum && pageNum <= pagesContainer.length) {
      setCurrentPage(pageNum);
    }
  }

  function handlePagePerSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentPage(1);
    setPerPage(parseInt(event.target.value));
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
            defaultValue={perPageOptions[1].val}
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
