import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const Pagination = ({
  images, imgId, totals, page, perPage, onPageChange,
}) => {
  const startRange = (page) * perPage + 1;
  let endRange = ((page + 1) * perPage);

  endRange = endRange < images.length ? endRange : images.length;

  const imgStart = startRange - 1;

  return (
    <div>
      <h1>
        {startRange}
          ...
        {endRange}
        {' '}
          of
        {' '}
        {images.length}
      </h1>
      <h1>
          information
      </h1>
      <nav aria-label="...">
        <ul className="page__ul">
          <li className="page-item disabled">
            <span className="page-link">
              <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page < 1}
              >
                Previous
              </button>
            </span>
          </li>
          <li
            className="page-item"

          >
            {Array.from(Array(totals)).map((total, i) => (
              <NavLink
                className="page-link"
                to={`/${i + 1}`}
                onClick={() => onPageChange(i)}
                activeClassName="hello"
              >
                {i + 1}
              </NavLink>
            ))}
          </li>

          <li className="page-item">
            <a
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
            </a>
          </li>
        </ul>
      </nav>
      <p>
        {(imgId && images.slice(imgStart, endRange)) && (
          images.slice(imgStart, endRange).map(imag => (
            <img
              alt="images"
              width={500}
              src={imag.download_url}
            />
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
};

export default Pagination;
