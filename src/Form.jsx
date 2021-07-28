/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const perPageOptions = [3, 5, 10, 20];

export const Form = () => {
  const [settings, setSettings] = useState({
    total: 42,
    perPage: 5,
  });
  const [error, setError] = useState(false);

  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (+value || value === '') {
      setSettings({
        ...settings,
        [name]: +value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (settings.total < settings.perPage) {
      setError(true);

      return;
    }

    setError(false);

    const keys = Object.keys(settings);

    keys.forEach((key) => {
      if (settings[key] > 0) {
        searchParams.set(key, settings[key]);
      } else {
        searchParams.delete(key);
      }
    });

    history.push(`?${searchParams.toString()}`);
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
            value={settings.total}
            onChange={handleChange}
          />
        </label>

        <label className="label">
          Items per page:
          <select
            className="form-select"
            name="perPage"
            value={settings.perPage}
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

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
