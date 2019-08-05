import React from 'react';
import PropTypes from 'prop-types';

const ItemsPerPage = ({ perPage, onPerPageChange }) => (
  <div>
    <h3>
      items per Page:
      {perPage}
    </h3>

    <select
      value={perPage}
      onChange={onPerPageChange}
      name="perPage"
    >
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </div>
);

ItemsPerPage.propTypes = {
  perPage: PropTypes.number.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
};

export default ItemsPerPage;
