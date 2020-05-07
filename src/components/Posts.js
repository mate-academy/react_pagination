import React from 'react';
import PropTypes from 'prop-types';

export const Posts = ({ posts }) => (
  <ul className="list-group">
    {posts.map(post => (
      <li key={post.id} className="list-group-item">
        {post.title}
      </li>
    ))}
  </ul>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
