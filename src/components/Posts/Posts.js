
import React from 'react';
import './Posts.css';
import PropTypes from 'prop-types';
import { PostShape } from '../../Shapes';

export const Posts = ({ posts, loading }) => (

  !loading ? (
    <ul className="list-group">
      {posts.map(post => (
        <li className="list-group-item" key={post.id}>
          {post.id}
          . &nbsp;
          {post.body}
        </li>
      ))}
    </ul>
  ) : <h1>Loading...</h1>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PostShape).isRequired,
  loading: PropTypes.bool.isRequired,
};
