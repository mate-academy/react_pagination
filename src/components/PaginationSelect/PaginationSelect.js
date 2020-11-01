import React from 'react';
import PropTypes from 'prop-types';

export const PaginationSelect = ({ perPage, onPerPageChange }) => {
  const handleChange = (event) => {
    onPerPageChange(Number(event.target.value));
  };

  return (
    <select
      name="PaginationSelect"
      value={perPage}
      className="form-control col-md-1"
      onChange={handleChange}
    >
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  );
};

PaginationSelect.propTypes = {
  perPage: PropTypes.number.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
};
