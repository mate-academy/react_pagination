/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const perPageOptions = [3, 5, 10, 20];

export const Form = () => {
  const [error, setError] = useState(false);

  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (value > 0) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }

    history.push({
      pathname: '/1',
      search: `?${searchParams.toString()}`,
    });

    if (+searchParams.get('total') < +searchParams.get('perPage')) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="form-group container"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="alert alert-danger">
          Items per page cant be bigger than total amount of items
        </div>
      )}
      <div>

        <label className="label">
          Total amount of items:
          <input
            className="form-control"
            name="total"
            type="number"
            onBlur={handleChange}
          />
        </label>

        <label className="label">
          Items per page:
          <select
            className="form-select"
            name="perPage"
            value={searchParams.get('perPage') || 5}
            onChange={handleChange}
          >
            {perPageOptions.map(option => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  );
};
