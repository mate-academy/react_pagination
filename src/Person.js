import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const Person = ({ person, index }) => (
  <tr
    key={person.name}
    className="PeopleTable__row--selected"
  >
    <td className="Person__index">{index + 1}</td>
    <td className="Person__name">{person.name}</td>
  </tr>
);

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Person;
