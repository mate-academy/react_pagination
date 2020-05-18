import React from 'react';
import PropTypes from 'prop-types';

const TabsList = ({ tabs }) => (
  <>
    <div className="ui top attached tabular menu">
      <h3 className="item ui header violet">Tabs list</h3>
    </div>
    <ul className="ui bottom attached active tab segment tabs">
      {tabs.map(({ title, content }) => (
        <li key={title}>
          <h4 className="tabs__title">{title}</h4>
          <p className="tabs__content">{content}</p>
        </li>
      ))}
    </ul>
  </>
);

TabsList.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ).isRequired,
};

export default TabsList;
