import React from 'react';
import PropTypes from 'prop-types';

const PostsComponent = ({ posts }) => (

  <ul className="list-group">
    {posts.map(post => (
      <li key={post.id} className="list-group-item">
        {post.title}
      </li>
    ))}
  </ul>
);

PostsComponent.propTypes = {
  posts: PropTypes.arrayOf.isRequired,
};

export default PostsComponent;
