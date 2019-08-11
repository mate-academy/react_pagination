/* eslint-disable */
import React from 'react';
import {NavLink} from "react-router-dom";

const Pagination = ({
  postsPerPage, totalPosts, paginate, currentPage,
}) => {
  const pageNumbers = [];
  const pageNumber = Math.ceil(totalPosts / postsPerPage);
  for (let i = 1; i <= pageNumber; i++) {
    pageNumbers.push(i);
  }

  const prevNext = (direction) => {
    if (direction === 'prev' && currentPage === 1) {
      return 1;
    }

    if (direction === 'next' && currentPage === pageNumber) {
      return pageNumber;
    }

    switch (direction) {
      case 'next':
        return currentPage += 1;
      case 'prev':
        return currentPage -= 1;
      default:
    }
  };
  return (
    <div>
      <nav>
        <ul className="pagination">
          <li>
            <button
              onClick={() => paginate(prevNext('prev'))}
              className="btn btn-primary mr-5"
              disabled={currentPage === 1}
            >
                Prev
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <NavLink
                className="page-link"
                onClick={() => paginate(number)}
                to="/"
              >
                {number}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => paginate(prevNext('next'))}
              className="btn btn-primary ml-5"
              disabled={currentPage === pageNumber}
            >
                Next
            </button>
          </li>
        </ul>
      </nav>

    </div>

  );
};

export default Pagination;
