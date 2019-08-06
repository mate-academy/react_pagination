import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ currentComment }) => (
  <div className="comment">
    <div className="comment__email">{ currentComment.email }</div>
    <h2 className="comment__name">{ currentComment.name }</h2>
    <p className="comment__text">{ currentComment.body }</p>
  </div>
);

Comment.propTypes = {
  currentComment: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Comment;
