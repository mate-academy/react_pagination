import React from 'react';
import PropTypes from 'prop-types';

export const Page = ({ content, onPageChanged, page }) => (
  <a
    className="page-link"
    href={content}
    onClick={(event) => {
      event.preventDefault();

      switch (content) {
        case 'previous': {
          onPageChanged(page - 1);
          break;
        }

        case 'next': {
          onPageChanged(page + 1);
          break;
        }

        default: {
          if (page !== +content) {
            onPageChanged(+content);
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
