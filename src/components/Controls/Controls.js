import React from 'react';
import PropTypes from 'prop-types';

const Controls = ({
  showAdditionalInfo,
  itemsPerPage,
  handleSelect,
  changeView,
}) => (
  <div className="controls">
    <label htmlFor="additionalInfo">
      Show additional information:
      {' '}
      <input
        type="checkbox"
        onChange={showAdditionalInfo}
        id="additionalInfo"
      />
    </label>
    <label htmlFor="changeView">
      Change view:
      {' '}
      <input
        type="checkbox"
        onChange={changeView}
        id="changeView"
      />
    </label>
    <label htmlFor="itemsPerPage">
      Items per page:
      {' '}
      <select
        value={itemsPerPage}
        onChange={e => handleSelect(e.target.value)}
        id="itemsPerPage"
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </label>
  </div>
);

Controls.propTypes = {
  showAdditionalInfo: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default Controls;
