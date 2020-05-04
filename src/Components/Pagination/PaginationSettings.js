import React from 'react';
import PropTypes from 'prop-types';

const perPageOptions = [3, 6, 9, 12, 21];

const PaginationSettings = ({ value, handlePerPageQty }) => (
  <div className="pagination__settings">
    <span>Items per page: </span>
    <select value={value} onChange={e => handlePerPageQty(e.target.value)}>
      {perPageOptions.map(option => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </div>
);

PaginationSettings.propTypes = {
  value: PropTypes.number.isRequired,
  handlePerPageQty: PropTypes.func.isRequired,
};

export default PaginationSettings;
