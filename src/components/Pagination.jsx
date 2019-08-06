import React from 'react';
const randomstring = require('randomstring');

const Pagination = ({
  prevPage,
  nextPage,
  pagesCount,
  changePage,
  currentPage
}) => {
  const fancyButtons = page => {
    if (pagesCount < 6) {
      let buttons = new Array(pagesCount)
        .fill('')
        .map((value, index) => index + 1);

      return buttons;
    } else if (page < 4) {
      return [1, 2, 3, 4, 5, '...', pagesCount];
    } else if (page >= 4 && page < pagesCount - 4) {
      return [1, '...', page, page + 1, page + 2, '...', pagesCount];
    } else {
      return [
        1,
        '...',
        pagesCount - 4,
        pagesCount - 3,
        pagesCount - 2,
        pagesCount - 1,
        pagesCount
      ];
    }
  };

  const pageButtons = fancyButtons(currentPage);

  return (
    <ul className="pagination">
      <li className="pagination__button" onClick={prevPage}>
        &laquo;
      </li>
      {pageButtons.map((value, index) => (
        <li
          className={`pagination__button ${
            currentPage + 1 === value ? 'pagination__button--active' : null
          }`}
          key={randomstring.generate(5)}
          onClick={parseInt(value, 10) ? () => changePage(value - 1) : null}
        >
          {value}
        </li>
      ))}
      <li className="pagination__button" onClick={nextPage}>
        &raquo;
      </li>
    </ul>
  );
};

export default Pagination;
