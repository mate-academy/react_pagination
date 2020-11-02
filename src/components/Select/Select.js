import React from 'react';
import PropTypes from 'prop-types';

export const Select = ({ onPerPageChange, perPage }) => {
  const possiblePerPageVariants = [3, 5, 10, 20];

  return (
    <div className="d-flex justify-content-center">
      <select
        name="perPage"
        value={perPage}
        onChange={e => onPerPageChange(+e.target.value)}
        className="custom-select"
        style={{ width: '100px' }}
      >
        {possiblePerPageVariants.map(variant => (
          <option
            key={variant}
            value={variant}
          >
            {variant}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  onPerPageChange: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
};
