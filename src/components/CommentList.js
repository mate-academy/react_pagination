import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    {comments.map(commentData => (
      <Comment currentComment={commentData} key={commentData.id} />
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
