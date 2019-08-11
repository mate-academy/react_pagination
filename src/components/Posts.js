/* eslint-disable */
import React from 'react';

const Posts = ({ posts }) => (
  <ul className="list-group mb-4 posts">
    {posts.map(post => (
      <li key={post.id} className="list-group-item">
        {post.body}
      </li>

    ))}
  </ul>
);

export default Posts;
