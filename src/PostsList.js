import React from 'react';
import { ShapePostsList } from './Shapes/Shapes';
import { Post } from './Post';

export const PostsList = ({ posts, perPage, page }) => (
  <ul className="posts">
    {
      posts.map((post, i) => (
        <Post
          key={post.id}
          i={i}
          page={page}
          perPage={perPage}
          title={post.title}
        />
      ))
    }
  </ul>
);

PostsList.propTypes = ShapePostsList.isRequired;
