import React from 'react';
import PropTypes from 'prop-types';

const List = ({ people, page, perPage }) => {
  let key = 0;

  return (
    <ul>
      {
        people.filter((man, index) => (
          (+perPage * (+page - 1)) <= index && index <= (+perPage * +page - 1)
        )).map((man) => {
          key += 1;

          return <li key={key}>{man.name}</li>;
        })
      }
    </ul>
  );
};

List.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default List;
