import React from 'react';
import PropTypes from 'prop-types';

export const Content = (
  { total,
    perPage,
    page,
    perPageChange,
    info },
) => {
  const perPageOptions = [3, 5, 10, 20];
  const firstVisibleId = (page - 1) * perPage + 1;
  const lastVisibleId = (firstVisibleId + perPage - 1) > total
    ? total
    : firstVisibleId + perPage - 1;
  const content = [...Array(total)]
    .map((_, i) => ({
      id: i + 1,
      text: 'Some text',
    }));

  return (
    <>
      <select
        name="perPage"
        value={perPage}
        onChange={perPageChange}
        className="page-selector"
      >
        {perPageOptions.map(value => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>

      <ul>
        {content.filter(item => item.id >= firstVisibleId
        && item.id <= lastVisibleId)
          .map(item => (
            <li key={item.id} className="li">
              {item.id}
              {'. '}
              {item.text}
            </li>
          ))}
      </ul>

      { info && (
        <p className="page-info">
          {`${firstVisibleId} - ${lastVisibleId} of ${total}`}
        </p>
      )}
    </>
  );
};

Content.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPageChange: PropTypes.func.isRequired,
  info: PropTypes.bool.isRequired,
};
