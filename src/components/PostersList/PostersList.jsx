import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import './PostersList.scss';

import { Poster } from '../Poster';

export const PostersList = ({ posters }) => (

  <ul className="posters-list">
    {
          posters.map(object => (
            <li className="card" key={uuidv4()}>
              <Poster {...object} />
            </li>
          ))
        }
  </ul>

);

PostersList.propTypes = {
  posters: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
