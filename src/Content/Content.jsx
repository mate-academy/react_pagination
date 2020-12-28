import React from 'react';
import { PropTypes } from 'prop-types';
import { makeEmojiArray } from '../helpers/makePagesArray';

export const Content = ({ pagination }) => {
  const { total, perPage, page } = pagination;
  const forPage = ((page - 1) * perPage);
  const toPage = perPage * page > total ? total : perPage * page;

  return (
    <div className="emoji">
      {makeEmojiArray(total).slice(forPage, toPage).map(emoji => (
        <span className="emoji" key={emoji}>{emoji}</span>
      ))}
    </div>
  );
};

Content.propTypes = {
  pagination: PropTypes.shape().isRequired,
};
