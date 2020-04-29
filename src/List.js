import React from 'react';
import PropTypes, { number } from 'prop-types';

const List = ({ currentContent }) => (
  <ul>
    {currentContent.map(item => (
      <li className="item" key={item}>
        {item}
      </li>
    ))}
  </ul>
);

List.propTypes = {
  currentContent: PropTypes.arrayOf(number).isRequired,
};

export default List;
