import React from 'react';
import PropTypes from 'prop-types';

const TabsList = ({ tabs }) => (
  <ol className="tabs">
    {tabs.map(({ title, content }) => (
      <li key={title}>
        <h3 className="tabs__title">{title}</h3>
        <p className="tabs__content">{content}</p>
      </li>
    ))}
  </ol>
);

TabsList.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string)
  ).isRequired,
};

export default TabsList;
