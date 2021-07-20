import React from 'react';
import PropTypes from 'prop-types';

export const Page = ({ content }) => (
  <a className="page-link" href={content}>
    {content}
  </a>
);

Page.propTypes = {
  content: PropTypes.number.isRequired,
};
