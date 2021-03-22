import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';

export const NextPage = ({ pagesQuantity, selectedPage, nextPageHandler }) => (
  <li
    className="page-item"
    onClick={() => {
      nextPageHandler(pagesQuantity);
    }}
  >
    <a
      className={classNames(
        'page-link',
        { 'text-danger disable': selectedPage === pagesQuantity },
      )}
      href={`#${selectedPage}`}
    >
      Next
    </a>
  </li>
);

NextPage.propTypes = {
  pagesQuantity: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  prevPageHandler: PropTypes.func.isRequired,
}.isRequired;
