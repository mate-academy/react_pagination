import React from 'react';
import PropTypes from 'prop-types';

export const PaginationButton = ({ simbol, page, onPageChange }) => (
  <button
    type="button"
    className="page-link"
    onClick={(event) => {
      event.preventDefault();

      onPageChange(+page);
    }}
  >
    <span>{simbol || page}</span>
  </button>
);

PaginationButton.propTypes = {
  simbol: PropTypes.string,
  page: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

PaginationButton.defaultProps = {
  simbol: '',
};
