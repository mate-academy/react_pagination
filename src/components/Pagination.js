import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Pagination = ({
  total,
  perPage,
  page,
  handleClick,
  handleChange,
  withInfo,
}) => {
  const pagesArr = [];

  const prevBtn = classNames({
    'list-item': true,
    'is-active': page !== 1,
  });

  const nextBtn = classNames({
    'list-item': true,
    'is-active': page !== Math.ceil(total / perPage),
  });

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pagesArr.push(i);
  }

  return (
    <>
      <select name="items" id="items" onChange={event => handleChange(event)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      {
        withInfo
          ? (
            <p>
              {perPage * (page - 1) + 1 }
              -
              {perPage * page > total
                ? total
                : perPage * page}
              {' '}
                  of
              {' '}
              {total}
            </p>
          )
          : ''
      }

      <ul className="list">
        <li>
          <button
            className={prevBtn}
            type="button"
            onClick={event => handleClick(event)}
            value="prev"
          >
            prev
          </button>
        </li>
        {pagesArr.map((pageNum) => {
          const navClass = classNames({
            'list-item': true,
            'is-shown': true,
            'is-active': page === pageNum,
          });

          return (
            <li key={pageNum}>
              <button
                className={navClass}
                type="button"
                onClick={event => handleClick(event)}
                value={pageNum}
              >
                {pageNum}
              </button>
            </li>
          );
        })}

        <li>
          <button
            className={nextBtn}
            type="button"
            onClick={event => handleClick(event)}
            value="next"
          >
            next
          </button>
        </li>
      </ul>
    </>
  );
};

Pagination.defaultProps = {
  withInfo: false,
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  withInfo: PropTypes.bool,
};

export default Pagination;
