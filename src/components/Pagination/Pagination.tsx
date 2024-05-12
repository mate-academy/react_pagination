import React from 'react';
import {getPages} from "../../utils";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  const pages = getPages(1, 9).map(i => `${i}`);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
      </li>
      {pages.map(page => (
        <li key={page} className={`page-item ${parseInt(page) === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(parseInt(page))}>
            {page}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === pages.length ? 'disabled' : ''}`}>
      <button
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pages.length}
        >
          »
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
