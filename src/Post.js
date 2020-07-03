import React from 'react';
import { ShapePost } from './Shapes/Shapes';

export const Post = ({ i, page, perPage, title }) => (
  <li className="post">
    <h4>{`${(i + 1 + (perPage * (page - 1)))}. `}</h4>
    <p>
      {title}
    </p>
  </li>
);

Post.propTypes = ShapePost.isRequired;
