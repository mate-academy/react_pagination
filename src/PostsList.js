import React from 'react';
import { ShapeGeneratePage } from './Shapes/Shapes';

export const PostsList = ({ posts, perPage, page }) => {
  return (
    <ul className="posts">
      {
        posts.map((post, i) => (
          <li className="post" key={post.id}>
            <h4>{`${(i + 1 + (perPage * (page - 1)))}. `}</h4>
            <p>
              {post.title}
            </p>
          </li>
        ))
      }
    </ul>
  );
};

PostsList.propTypes = ShapeGeneratePage.isRequired;
