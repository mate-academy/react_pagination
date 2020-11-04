import React from 'react';
import PropsTypes from 'prop-types';

import './Text.css';

const Text = ({ total, perPage, curPage }) => {
  const start = perPage * curPage - (perPage - 1);
  const end = perPage * curPage >= total.length
    ? total.length
    : perPage * curPage;

  return (
    <ul className="list">
      {total.map((item, index) => (
        index + 1 >= start && index + 1 <= end
          ? <li>{item}</li>
          : ''
      ))}
    </ul>
  );
};

Text.propTypes = {
  total: PropsTypes.arrayOf.isRequired,
  curPage: PropsTypes.number.isRequired,
  perPage: PropsTypes.number.isRequired,
};

export default Text;
