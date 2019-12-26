import React from 'react';
import cn from 'classnames';
import PropsTypes from 'prop-types';

const Pagination = ({ total, page, perPage, onPageChange }) => {
  const buttons = Math.ceil(total / perPage);

  const changePage = (event) => {
    const newPage = event.target.textContent;

    switch (newPage) {
      case 'Next':
        onPageChange(page + 1 > buttons ? buttons : page + 1);
        break;
      case 'Prev':
        onPageChange(page - 1 < 1 ? 1 : page - 1);
        break;
      default:
        onPageChange(+newPage);
    }
  };

  return (
    <div>
      <button
        className="pagination__button"
        type="button"
        onClick={changePage}
      >
        Prev
      </button>
      {Array(buttons).fill('').map((button, index) => (
        <button
          type="button"
          className={`pagination__button
          ${cn({
          selectButton: index + 1 === page,
        })}`}
          onClick={changePage}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={changePage}
        className="pagination__button"
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  total: PropsTypes.number.isRequired,
  page: PropsTypes.number.isRequired,
  perPage: PropsTypes.number.isRequired,
  onPageChange: PropsTypes.func.isRequired,
};

export default Pagination;
