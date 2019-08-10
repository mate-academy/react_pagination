/* eslint-disable */
import React from 'react';

const Pagination = ({
  postsPerPage, totalPosts, paginate, currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevNext = (direction) => {
    if (direction === 'prev' && currentPage === 1) {
      return 1;
    }

    if (direction === 'next' && currentPage === totalPosts / postsPerPage) {
      return totalPosts / postsPerPage;
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
            >
                Prev
            </button>

          </li>
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                className="page-link"
                href="#"
              >
                {number}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => paginate(prevNext('next'))}
              className="btn btn-primary ml-5"
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
