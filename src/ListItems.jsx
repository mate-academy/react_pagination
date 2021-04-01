import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const ListItems = ({ items }) => (
  <ul
    className={classNames(
      'list',
      'list-group',
      'list-group-horizontal',
      'justify-content-center',
    )}
  >
    {
      items.map(item => (
        <li
          key={item}
          className="list-group-item"
        >
          {item}
        </li>
      ))
    }
  </ul>
);

ListItems.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
};
