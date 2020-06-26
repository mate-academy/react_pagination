/* eslint-disable no-console */
import React from 'react';
import { ShapeGeneratePage } from '../Shapes/Shapes';
import { Post } from '../Post/Post';

export const GeneratePage = (props) => {
  console.log(props, 'ddddd');

  return (
    <ul>
      {
        props.posts.map(post => <Post post={post} />)
      }
    </ul>
  );
};

GeneratePage.propTypes = ShapeGeneratePage.isRequired;
