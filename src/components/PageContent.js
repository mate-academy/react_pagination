import React from 'react';
import PropTypes from 'prop-types';

export const PageContent = React.memo(({ pageContent }) => (
  <ul>
    {pageContent.map(element => (
      <li key={element}>
        {element}
      </li>
    ))}
  </ul>
));

PageContent.propTypes = {
  pageContent: PropTypes.arrayOf(PropTypes.number).isRequired,
};
