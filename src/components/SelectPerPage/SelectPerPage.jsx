import React from 'react';
import PropTypes from 'prop-types';

export const SelectPerPage = ({ perPage, onPerPageChange }) => {
  const selectValues = [3, 5, 10, 20];

  return (
    <label
      htmlFor="perPage"
      className="select-per-page"
    >
      Post per page:
      <select
        name="perPage"
        value={perPage}
        onChange={onPerPageChange}
      >
        {selectValues.map(value => (
          <option
            key={value}
            value={value}
          >
            {value}
          </option>
        ))}
      </select>
    </label>
  );
};

SelectPerPage.propTypes = {
  perPage: PropTypes.number.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
};
