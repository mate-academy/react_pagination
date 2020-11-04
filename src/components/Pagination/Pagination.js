import React from 'react';
import PropsTypes from 'prop-types';

import './Pagination.css';

const Pagination = ({ total, curPage, perPage, onPageChange }) => {
  const buttons = Math.ceil(total / perPage);

  const changePage = (event) => {
    const newPage = event.target.textContent;

    switch (newPage) {
      case 'Next':
        onPageChange(curPage + 1 > buttons ? buttons : curPage + 1);
        break;
      case 'Prev':
        onPageChange(curPage - 1 < 1 ? 1 : curPage - 1);
        break;
      default:
        onPageChange(+newPage);
    }
  };

  return (
    <div>
      <button
        className="pag_btn"
        type="button"
        onClick={changePage}
      >
        Prev
      </button>
      {Array(buttons).fill('').map((button, index) => (
        <button
          type="button"
          className='pag_btn'
          onClick={changePage}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={changePage}
        className="pag_btn"
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  total: PropsTypes.number.isRequired,
  curPage: PropsTypes.number.isRequired,
  perPage: PropsTypes.number.isRequired,
  onPageChange: PropsTypes.func.isRequired,
};

export default Pagination;
