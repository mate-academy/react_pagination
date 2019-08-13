import React from 'react';
import classnames from 'classnames';
import {
  NavLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Person from './Person';

const Pagination = ({
  people, pageId, totals, page, perPage, onPageChange, handleDecide,
}) => {
  let startRange = (page) * perPage + 1;

  if (startRange > people.length) {
    startRange = 0;
  }

  let endRange = ((page + 1) * perPage);

  endRange = endRange < people.length ? endRange : people.length;

  const imgStart = startRange - 1;

  return (
    <div>
      <div className="main__container">
        <Header
          endRange={endRange}
          people={people}
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
      {pageId && people.slice(imgStart, endRange).map((person, index) => (
        <Person
          person={person}
          index={index}
        />
      ))}

      {/* <p>
        {(pageId && people.slice(imgStart, endRange)) && (
          people.slice(imgStart, endRange).map(imag => (
            <div className="product">
              <img
                alt="people"
                className="product__img"
                height={300}
                src={imag.download_url}
              />
            </div>
          ))
        )
        }
      </p> */}
    </div>

  );
};

Pagination.propTypes = {
  people: PropTypes.shape(
    PropTypes.array,
    PropTypes.object,
  ).isRequired,
  pageId: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  totals: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  handleDecide: PropTypes.func.isRequired,
};

export default Pagination;
