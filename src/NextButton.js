import React from 'react';

import PropTypes from 'prop-types';

const classNames = require('classnames');

const NextButton = ({
  togglePrevNext,
  nextDisabled,
  page,
}) => (
  <li className={classNames('page-item', { disabled: nextDisabled })}>
    <input
      name="next"
      onClick={event => togglePrevNext(event, page + 1)}
      className="page-link"
      type="button"
      value="Next"
    />
  </li>
);

NextButton.propTypes = {
  togglePrevNext: PropTypes.func.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

export default NextButton;
