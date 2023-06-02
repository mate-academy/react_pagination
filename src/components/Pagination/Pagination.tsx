import React from 'react';
import '../../App.css';

interface PaginationProps {
  total:number,
  perPage:number,
  currentPage:number,
  onPageChange:(arg0:number)=>void,
}

export const Pagination: React.FC<PaginationProps>
= ({
  total, perPage, currentPage, onPageChange,
}) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (Math.ceil(total / perPage) > currentPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          // eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-disabled={currentPage === 1}
          onClick={handlePreviousClick}
        >
          «
        </a>
      </li>
      {
      //  [...Array(Math.ceil(total / perPage))].map((_e, i) => (
        Array.from({ length: Math.ceil(total / perPage) }).map((_e, i) => (
          // eslint-disable-next-line react/no-array-index-key, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={`page-item ${(currentPage === i + 1) ? 'active' : ''}`}
            onClick={() => onPageChange(i + 1)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${i + 1}`}>
              {i + 1}
            </a>
          </li>
        ))
      }
      <li className={`page-item ${Math.ceil(total / perPage) === currentPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          // eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-disabled={`${Math.ceil(total / perPage) === currentPage ? 'true' : 'false'}`}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
