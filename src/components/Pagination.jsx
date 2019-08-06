import React from 'react';
const randomstring = require('randomstring');

const Pagination = ({
  prevPage,
  nextPage,
  pagesCount,
  changePage,
  currentPage,
  postsPerPage
}) => {
  const pagindationButtons = new Array(pagesCount).fill('');

  const advancedButtons = index => {
    switch (index) {
      case 0:
        return true;
      case currentPage - 1:
        return true;
      case currentPage:
        return true;
      case currentPage + 1:
        return true;
      case postsPerPage - 1:
        return true;
      default:
        return false;
    }
  };

  return (
    <ul className="pagination">
      <li className="pagination__button" onClick={prevPage}>
        &laquo;
      </li>
      {pagindationButtons.map((value, index) =>
        advancedButtons(index) ? (
          <li
            className={`pagination__button ${
              currentPage === index ? 'pagination__button--active' : null
            }`}
            key={randomstring.generate(5)}
            onClick={() => changePage(index)}
          >
            {index + 1}
          </li>
        ) : null
      )}
      <li className="pagination__button" onClick={nextPage}>
        &raquo;
      </li>
    </ul>
  );
};

export default Pagination;
