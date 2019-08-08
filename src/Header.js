import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  images, startRange, endRange, handleDecide,
}) => (
  <div className="container">
    <h1 className="information">
      {startRange}
          ...
      {endRange }
          of
      { images.length}
    </h1>
    <form action="/" className="adress-delivery__header">
      <span>images on pages</span>
      <div
        className="destination-details"
      >
        <select
          name=""
          onClick={handleDecide}
          className="adress-delivery__destination-details"
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </form>
  </div>
);

Pagination.propTypes = {
  images: PropTypes.shape(
    PropTypes.array,
    PropTypes.object,
  ).isRequired,
  startRange: PropTypes.number.isRequired,
  endRange: PropTypes.number.isRequired,
  handleDecide: PropTypes.func.isRequired,
};

export default Pagination;
