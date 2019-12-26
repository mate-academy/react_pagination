import React from 'react';
import PropsTypes from 'prop-types';

const Text = ({ content, perPage, page }) => {
  const start = perPage * page - (perPage - 1);
  const end = perPage * page >= content.length
    ? content.length
    : perPage * page;

  return (
    <>
      <p>
        {`Showing ${start} to ${end} of ${content.length} entries`}
      </p>
      <ul>
        {content.map((item, index) => (
          index + 1 >= start && index + 1 <= end
            ? <li>{item}</li>
            : ''
        ))}
      </ul>
    </>
  );
};

Text.propTypes = {
  content: PropsTypes.arrayOf.isRequired,
  page: PropsTypes.number.isRequired,
  perPage: PropsTypes.number.isRequired,
};

export default Text;
