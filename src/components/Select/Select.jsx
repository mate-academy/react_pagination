import React from 'react';
import PropTypes from 'prop-types';

export function Select({
  onChangeAmountOfPages,
  amountPage,
}) {
  return (
    <select
      onChange={onChangeAmountOfPages}
      className="pagination__select"
      value={amountPage}
    >
      <option value={3}>3</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  );
}

Select.propTypes = {
  onChangeAmountOfPages: PropTypes.func.isRequired,
  amountPage: PropTypes.number.isRequired,
};
