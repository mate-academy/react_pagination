import React from 'react';
import PropTypes from 'prop-types';
import './PerPageSelector.css';

export const PerPageSelector = (props) => {
  const { perPage, perPageOptions, onPerPageChange } = props;

  const handlePerPageChange = (evt) => {
    onPerPageChange(evt.target.value);
  };

  return (
    <p className="form-group">
      <label className="label">
        Items per page:
        {' '}
        <select
          value={perPage}
          onChange={handlePerPageChange}
        >
          {perPageOptions.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </label>
    </p>
  );
};

PerPageSelector.propTypes = {
  perPage: PropTypes.number.isRequired,
  perPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPerPageChange: PropTypes.func.isRequired,
};
