import React from 'react';
import classnames from 'classnames';
import {
  NavLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';

const Pagination = ({
  images, imgId, totals, page, perPage, onPageChange, handleDecide,
}) => {
  const startRange = (page) * perPage + 1;
  let endRange = ((page + 1) * perPage);

  endRange = endRange < images.length ? endRange : images.length;

  const imgStart = startRange - 1;

  return (
    <div>
      <div className="main__container">
        <Header
          endRange={endRange}
          images={images}
          startRange={startRange}
          handleDecide={handleDecide}
        />
        <nav aria-label="...">
          <ul className="page__ul">
            <li className="page-item disabled">
              <span className="page-link">
                <button
                  type="button"
                  onClick={() => onPageChange(page - 1)}
                  disabled={page < 1}
                >
                Prev
                </button>
              </span>
            </li>
            <li className="page-item">
              {Array.from(Array(totals)).map((total, i) => (
                <NavLink
                  className={classnames({
                    hello: page === i,
                    'page-link': true,
                  })}
                  to={`/${i + 1}`}
                  onClick={() => onPageChange(i)}
                >
                  {i + 1}
                </NavLink>
              ))}
            </li>

            <li className="page-item">
              <div
                className="page-link"
                href="/#"
              >
                <button
                  type="button"
                  onClick={() => onPageChange(page + 1)}
                  disabled={page >= totals - 1}
                >
                  Next
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <p>
        {(imgId && images.slice(imgStart, endRange)) && (
          images.slice(imgStart, endRange).map(imag => (
            <div className="product">
              <img
                alt="images"
                className="product__img"
                height={300}
                src={imag.download_url}
              />
            </div>
          ))
        )
        }
      </p>
    </div>

  );
};

Pagination.propTypes = {
  images: PropTypes.shape(
    PropTypes.array,
    PropTypes.object,
  ).isRequired,
  imgId: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  totals: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  handleDecide: PropTypes.func.isRequired,
};

export default Pagination;
