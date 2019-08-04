import React from 'react';
import PropTypes from 'prop-types';

const List = ({ currentPage }) => (
  <div>
    {
      currentPage.map(tab => (
        <div key={tab.id}>
          <h3>{tab.title}</h3>
          <div>{tab.content}</div>
        </div>
      ))
    }
  </div>
);

List.propTypes = {
  currentPage: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  })).isRequired,
};

export default List;
