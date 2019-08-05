
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  state = {
    pages: [],
  }

  render() {
    const {
      images, selected, handleSelect,
    } = this.props;

    return (
      <nav
        aria-label="..."
      >
        <ul>
          <li
            className="page-item disabled"
          >
            <span
              className="page-link"
            >
              <button
                type="button"
              >
                {this.state.pages}
                Previous
              </button>
            </span>
          </li>
          {images.map((img, index) => (
            <li className="page-item">
              <a
                className="page-link"
                href="/#"
              >
                <button
                  type="button"
                  className={classNames({ 'check--active': selected === img })}
                  onClick={() => handleSelect(img)}
                >
                  {index + 1}
                </button>
              </a>
            </li>

          ))}

          <li className="page-item">
            <a
              className="page-link"
              href="/#"
            >
              <button
                type="button"
              >
            Next
              </button>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  images: PropTypes.shape().isRequired,
  selected: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default Pagination;
