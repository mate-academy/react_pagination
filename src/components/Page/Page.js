import React from 'react';
import PropTypes from 'prop-types';

export const Page = ({ content, onPageChanged, page }) => (
  <a
    className="page-link"
    href={content}
    onClick={(event) => {
      event.preventDefault();

      const { target } = event;
      const pageSelected = target.textContent;

      switch (pageSelected) {
        case 'previous': {
          onPageChanged(page - 1);
          break;
        }

        case 'next': {
          onPageChanged(page + 1);
          break;
        }

        default: {
          if (page !== +pageSelected) {
            onPageChanged(+pageSelected);
          }

          break;
        }
      }
    }}
  >
    {content}
  </a>
);

Page.propTypes = {
  content: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
};
