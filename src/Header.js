import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  people, startRange, endRange, handleDecide,
}) => (
  <div className="container">
    <h1 className="information">
      {startRange}
          ...
      {endRange }
          of
      {people.length}
    </h1>
  </div>
);

Pagination.propTypes = {
  people: PropTypes.shape(
    PropTypes.array,
    PropTypes.object,
  ).isRequired,
  startRange: PropTypes.number.isRequired,
  endRange: PropTypes.number.isRequired,
  handleDecide: PropTypes.func.isRequired,
};

export default Pagination;
