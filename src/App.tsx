import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';
import { ContentList } from './components/ContentList/ContentList';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [total] = useState(+items.length);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const paginationStepForward = () => {
    setCurrentPage(prev => prev + 1);
  };

  const paginationStepBack = () => {
    setCurrentPage(prev => prev - 1);
  };

  useEffect(() => {
    if (Math.ceil(total / perPage) < currentPage) {
      setCurrentPage(Math.ceil(total / perPage));
    }
  }, [perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${perPage * (currentPage - 1) + 1} -
          ${perPage * currentPage > total ? total : perPage * currentPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => setPerPage(+e.target.value)}
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

      {/* Move this markup to Pagination */}

      <Pagination
        total={+total}
        perPage={perPage}
        currentPage={currentPage}
        stepForward={paginationStepForward}
        stepBack={paginationStepBack}
        click={setCurrentPage}
      />

      <ContentList
        total={total}
        perPage={perPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
