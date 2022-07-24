import classNames from 'classnames';
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const[perPage, setPerPage] = useState(7);
  const[currentPage, setCurrentPage] = useState(1);

  const startItem = perPage * (currentPage - 1);
  const endItem = perPage * (currentPage);
  const itemsToShow = items.slice(startItem, endItem);
  const pagesList = (new Array(Math.ceil(items.length / (endItem - startItem)))).fill(1).map((a,i)=>i + a);

  const handleClickSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  }

  const handleArrowPrev =() => {
      let prevPage = 0;
      currentPage === 1 ? prevPage = currentPage : prevPage = currentPage - 1;
      setCurrentPage(prevPage);
    }

    const handleArrowNext =() => {
      let togglePage = 0;
      currentPage === (pagesList.length) ? togglePage = currentPage : togglePage = currentPage + 1;
      setCurrentPage(togglePage);
    }

  return (
    <div className="container">
      <h1>Items with Pagination </h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem + 1} - {endItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event)=>handleClickSelect(event)}
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
      <ul className="pagination">
        <li className={classNames('page-item', {'disabled': currentPage === pagesList[0]})}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
             aria-disabled="false"
            onClick={handleArrowPrev}
          >
            «
          </a>
        </li>
        {pagesList.map(page=>(
        <li
          className={classNames('page-item', {'active': page === currentPage})}>
        <a
          data-cy="pageLink"
          className="page-link"
          href="#{page}"
          key={page}
          onClick={()=>setCurrentPage(page)}>
            {page}
          </a>
      </li>
        ))}

        <li className={classNames('page-item', {'disabled': currentPage === pagesList[pagesList.length - 1]})}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={handleArrowNext}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsToShow.map(item=>(
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
