import React from 'react';

import PropTypes from 'prop-types';

const classNames = require('classnames');

const PrevButton = ({
  togglePrevNext,
  prevDisable,
  page,
}) => (
  <li className={classNames('page-item', { disabled: prevDisable })}>
    <input
      name="previous"
      onClick={event => togglePrevNext(event, page - 1)}
      className="page-link"
      type="button"
      value="Previous"
    />
  </li>
);

PrevButton.propTypes = {
  togglePrevNext: PropTypes.func.isRequired,
  prevDisable: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

export default PrevButton;
