import React from 'react';
import { ShapeGeneratePage } from './Shapes/Shapes';
import { NavLink } from 'react-router-dom';

export const Pages = (props) => {

  return (
    <NavLink to={{
      pathname: '/',
      search: `?page=${props.number}&perpage=${props.total}`,
    }}
    >
      {props.number}
    </NavLink>
  );
};

Pages.propTypes = ShapeGeneratePage.isRequired;
