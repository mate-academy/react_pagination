import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const classNames = require('classnames');

const Pagination = ({ page, buttonsNumbers, perPage }) => {
  const paginationBtnClass = (buttonNumber, pageNum) => (
    classNames({
      button: true,
      'button--pagination': true,
      'button--active': buttonNumber === pageNum,
    }));

  const firstDotsClass = classNames({
    dots: true,
    hide: page < 4,
  });

  const lastDotsClass = classNames({
    dots: true,
    hide: page > buttonsNumbers.length - 3,
  });

  const backClass = classNames({
    button: true,
    'button--flip': true,
    isDisabled: page <= 1,
  });

  const nextClass = classNames({
    button: true,
    'button--flip': true,
    isDisabled: page >= buttonsNumbers.length,
  });

  return (
    <div className="Pagination">
      <NavLink
        to={
          page > 1
            ? `/${page - 1}?perpage=${perPage}`
            : `/${page}?perpage=${perPage}`
        }
        name="back"
        className={backClass}
      >
        {'<'}
      </NavLink>

      <ul className="pagination__list">
        <li>
          <NavLink
            to={`/${buttonsNumbers[0]}?perpage=${perPage}`}
            name={buttonsNumbers[0]}
            className={paginationBtnClass(buttonsNumbers[0], page)}
          >
            {buttonsNumbers[0]}
          </NavLink>
        </li>

        <li className={firstDotsClass}>...</li>

        {buttonsNumbers
          .filter((buttonNumber, index, buttons) => (
            index !== 0
            && index !== buttons.length - 1
            && (index + 1 === page
            || index + 1 === page + 1
            || index + 1 === page - 1)))
          .map((buttonNumber, i, buttons) => (
            <li key={buttonNumber}>
              <NavLink
                to={`/${buttonNumber}?perpage=${perPage}`}
                name={buttonNumber}
                className={paginationBtnClass(buttonNumber, page)}
              >
                {buttonNumber}
              </NavLink>
            </li>
          ))}

        <li className={lastDotsClass}>...</li>

        <li>
          <NavLink
            to={
              `/${buttonsNumbers[buttonsNumbers.length - 1]}?perpage=${perPage}`
            }
            name={buttonsNumbers[buttonsNumbers.length - 1]}
            className={paginationBtnClass(
              buttonsNumbers[buttonsNumbers.length - 1],
              page,
              buttonsNumbers.length
            )}
          >
            {buttonsNumbers[buttonsNumbers.length - 1]}
          </NavLink>
        </li>
      </ul>

      <NavLink
        to={
          page <= buttonsNumbers.length - 1
            ? `/${page + 1}?perpage=${perPage}`
            : `/${page}?perpage=${perPage}`
        }
        name="next"
        className={nextClass}
      >
        {'>'}
      </NavLink>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  buttonsNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Pagination;
