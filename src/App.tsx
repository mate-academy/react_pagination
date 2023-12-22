import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './App.css';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

function finList(start: number, end: number) {
  return (
    <ul>
      {items.slice(start, end + 1).map((item) => (
        <li data-cy="item" key={item}>{item}</li>
      ))}
    </ul>
  );
}

function calculationOfItems(itemsPerPage: number, page: number) {
  const start: number = page * itemsPerPage - itemsPerPage;
  const end: number = page * itemsPerPage - 1;

  return { start, end };
}

export const App: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const pageQueryParam = new URLSearchParams(location.search).get('page');
    const perPageQueryParam = new URLSearchParams(location.search)
      .get('perPage');

    setActivePage(pageQueryParam ? +pageQueryParam : 1);
    setItemsPerPage(perPageQueryParam ? +perPageQueryParam : 5);
  }, [location.search]);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationLinks = Array.from({ length: totalPages },
    (_, index) => index + 1);

  const handlePageLinkClick = (page: number) => {
    setActivePage(page);
    navigate(`?page=${page}&perPage=${itemsPerPage}`);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    navigate(`?page=1&perPage=${newItemsPerPage}`);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${itemsPerPage * (activePage - 1) + 1} - ${Math.min(itemsPerPage * activePage, totalItems)} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
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

      <ul className="pagination">
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={activePage === 1}
            onClick={() => handlePageLinkClick(Math.max(activePage - 1, 1))}
          >
            «
          </a>
        </li>
        {paginationLinks.map((pageNum) => (
          <li key={pageNum} className={`page-item ${activePage === pageNum ? 'active' : ''}`}>
            <a
              data-cy="pageLink"
              onClick={() => handlePageLinkClick(pageNum)}
              className="page-link"
              href={`#${pageNum}`}
            >
              {pageNum}
            </a>
          </li>
        ))}
        <li className={`page-item ${activePage === totalPages ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={
              () => handlePageLinkClick(Math.min(activePage + 1, totalPages))
            }
            aria-disabled={activePage === totalPages}
          >
            »
          </a>
        </li>
      </ul>
      {finList(calculationOfItems(itemsPerPage, activePage).start,
        calculationOfItems(itemsPerPage, activePage).end)}
    </div>
  );
};

export default App;
