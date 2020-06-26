import React from 'react';
import { ShapeGeneratePage } from '../Shapes/Shapes';

export const Post = ({ post }) => {
  console.log(post,'qqqq');

  return (
    <li>
      {post.id}
      .
      &nbsp;
      {post.title}
    </li>
  );
};

Post.propTypes = ShapeGeneratePage.isRequired;
