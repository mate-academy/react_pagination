import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getLinesForPage } from './helpers/helpers';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPageId, setCurrentPageId] = useState(1);

  const onPageLinkClick = (id: number) => {
    setCurrentPageId(id);
  };

  const onPageSelectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.target.value);
    setCurrentPageId(1);
  };

  const linesPerPageList = getLinesForPage(currentPageId, itemsPerPage);

  const startItem = (currentPageId - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPageId * itemsPerPage, 42);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPageId} (items ${startItem} - ${endItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={onPageSelectorChange}
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
        total={42}
        perPage={itemsPerPage}
        currentPageId={currentPageId}
        onPageLinkClick={onPageLinkClick}
      />
      <ul>
        {linesPerPageList.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
