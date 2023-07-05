import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export enum Steps {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

const allSteps: Steps[] = [3, 5, 10, 20];
const totalNumbersPoints = items.length;
const DEF_PAGE_STEP: Steps = 5;
const DEF_PAGE_CURRENT = 1;

export const App: React.FC = () => {
  const [step, setStep] = useState<Steps>(DEF_PAGE_STEP);
  const [currentPage, setCurrentPage] = useState(DEF_PAGE_CURRENT);
  const [lastPointOnPage, setLastPointOnPage] = useState<number>(DEF_PAGE_STEP);

  const startPointOnPage: number = (currentPage - 1) * step + 1;
  const changeNumberPage = (pageNumber: number) => {
    if (pageNumber >= 1
      && pageNumber <= totalNumbersPoints
      && currentPage !== pageNumber
    ) {
      const newLastPoint = (pageNumber * step > totalNumbersPoints)
        ? totalNumbersPoints
        : pageNumber * step;

      setCurrentPage(pageNumber);
      setLastPointOnPage(newLastPoint);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${
          startPointOnPage} - ${lastPointOnPage} of ${totalNumbersPoints})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={DEF_PAGE_STEP}
            onChange={(event) => {
              const newStep: Steps = +event.target.value;

              setStep(newStep);
              setCurrentPage(DEF_PAGE_CURRENT);
              setLastPointOnPage(newStep);
            }}
          >
            {allSteps.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalNumbersPoints} // 42 defeult
        perPage={step} // 5 per page defeult
        currentPage={currentPage} // 1 defeult
        onPageChange={changeNumberPage}
      />

      <ul>
        {[...items]
          .slice(startPointOnPage - 1, lastPointOnPage)
          .map(item => <li key={item} data-cy="item">{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
