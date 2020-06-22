import React from 'react';
import PropTypes from 'prop-types';

export const PaginationSelect = ({ page, handleOnChange }) => (
  <select
    className="form-control m-3"
    onChange={event => handleOnChange(page, event.target.value)}
    defaultValue="Items per page"
  >
    <option>Items per page</option>
    <option>3</option>
    <option>5</option>
    <option>10</option>
    <option>20</option>
  </select>
);

PaginationSelect.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
