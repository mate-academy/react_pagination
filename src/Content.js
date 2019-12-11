import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ selectedPage, perPage, content }) => {
  const contentToShow = content.filter((item, index) => (
    Math.floor(index / perPage) + 1 === selectedPage
  ));

  return (
    <ol className="content">
      {contentToShow.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
};

Content.propTypes = {
  selectedPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  content: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Content;
