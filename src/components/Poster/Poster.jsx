import React from 'react';
import PropTypes from 'prop-types';

import './Poster.scss';

export const Poster = ({ poster }) => (
  <img src={poster} className="poster" alt={poster} />
);

Poster.propTypes = {
  poster: PropTypes.string.isRequired,
};
