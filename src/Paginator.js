import React from 'react';
// import classNames from 'classnames';
import {
  NavLink, Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  state = {
    array: [],
  }

  componentDidMount() {
    const { images, perPage } = this.props;
    const arrays = [];

    for (let i = 0; i < Math.ceil(images.length / perPage); (i + 1)) {
      arrays.push(i);
    }

    this.setState({
      array: arrays,
    });
  }

  render() {
    const { array } = this.state;
    const {
      images, imgId,
    } = this.props;

    return (
      <div>
        <nav aria-label="...">
          <ul className="page__ul">
            <li className="page-item disabled">
              <span className="page-link">
                <button type="button">
                  {array}
                Previous
                </button>
              </span>
            </li>
            {images.map((img, index) => (
              <li
                className="page-item"
                key={img.id}
              >
                <Link
                  className="page-link"
                  href={() => false}
                >
                  <button
                    type="button"
                  >
                    <NavLink
                      to={`/${index + 1}`}
                      activeClassName="hello"
                    >
                      {index + 1}
                    </NavLink>
                  </button>
                </Link>
              </li>
            ))}

            <li className="page-item">
              <Link
                className="page-link"
                href={() => false}
              >
                <button type="button">
                  Next
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        <p>
          {(imgId && images[imgId - 1]) && (
            <img
              alt="images"
              width={500}
              src={images[imgId - 1].download_url}
            />
          )
          }
        </p>
      </div>

    );
  }
}

Pagination.propTypes = {
  images: PropTypes.shape(
    PropTypes.array,
    PropTypes.object,
  ).isRequired,
  imgId: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default Pagination;
