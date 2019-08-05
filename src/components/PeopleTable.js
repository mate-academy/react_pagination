import React from 'react';
import PropTypes from 'prop-types';

const PeopleTable = ({ peoples }) => (
  <table className="table table-bordered">
    <thead className="thead-dark">
      <tr>
        <th>id</th>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
        <th>age</th>
        <th>century</th>
        <th>children</th>
      </tr>
    </thead>
    <tbody>
      {peoples.map(person => (
        <tr>
          <td>{person.id}</td>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.mother}</td>
          <td>{person.father}</td>
          <td>{person.age}</td>
          <td>{person.century}</td>
          <td>{person.children}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  peoples: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    father: PropTypes.string,
    mother: PropTypes.string,
    age: PropTypes.number,
    century: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number,
  }).isRequired,
};

export default PeopleTable;
