/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import { ShapeGenerateLink } from '../Shapes/Shapes';
import './GenerateLink.css';

export const GenerateLink = ({ url, name, posts }) => {

  return (
    <li className="links">
      <Link to={url}>{name}</Link>
    </li>
  );
};

GenerateLink.propTypes = ShapeGenerateLink.isRequired;
