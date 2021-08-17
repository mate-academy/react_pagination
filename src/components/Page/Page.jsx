import React from 'react';
import './Page.css';
import PropTypes from 'prop-types';

export const Page = ({ perPage, page, total }) => (
  <p className="page__text">
    {`${(perPage * page - perPage + 1)} -
    ${(perPage * page > total
      ? total
      : perPage * page)} of ${total}`}
  </p>
);

Page.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};
