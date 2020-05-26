import React from 'react';
import PropTypes from 'prop-types';

export const VisiblePost = ({ posts, page, perPage }) => {
  const startPost = (page - 1) * perPage;
  const finishPost = startPost + perPage;

  return (
    posts.slice(startPost, finishPost).map(post => (
      <div className="item" key={post.id}>
        {' '}
        <span className="number">{post.id}</span>
        {post.title}
      </div>
    ))
  );
};

VisiblePost.propTypes = {
  posts: PropTypes.arrayOf().isRequired,
  page: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
};
