import React from 'react';
import PropTypes from 'prop-types';

const renderPaginationBtn = (onClick, page, total) => {
  const middleBtn = '...';
  const gapBtns = [page - 1, page, page + 1];

  let btns = [];

  if (page < total - 2 && page > 3) {
    btns = [1, middleBtn, ...gapBtns, middleBtn, total];
  } else

  if (page >= total - 2) {
    btns = [total - 2, total - 1, total];
  } else

  if (page <= 3) {
    btns = [1, 2, 3];
  }

  return btns.map((btn) => {
    if (btn === '...') {
      return btn;
    }

    return (
      <button
        type="button"
        key={btn}
        onClick={onClick}
        data-name={btn}
      >
        {btn}
      </button>
    );
  });
};

// const rangeButtons = (from, to, step = 1) => {
//   let i = from;
//   const range = [];
//
//   while (i <= to) {
//     range.push(i);
//     i += step;
//   }
//
//   return range;
// };

export const Pagination = ({ onClick, page, total }) => (
  <div className="pagination">
    {page > 3
    && <button type="button" onClick={onClick} data-name="prev">{'<<'}</button>}
    {renderPaginationBtn(onClick, page, total)}
    {page < total - 2
    && <button type="button" onClick={onClick} data-name="next">{'>>'}</button>}
  </div>
);

Pagination.propTypes = {
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
