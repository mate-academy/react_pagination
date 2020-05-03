import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    const { total, perPage, page } = this.props;

    this.state = {
      navInfo: `${((page - 1) * perPage) + 1}-${page * perPage} of ${total}`,
    };
  }

  render() {
    const { total, perPage, page, onPageChange } = this.props;
    const totalPages = Math.ceil(total / perPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }

    return (
      <nav>
        <p className="nav__info">{this.state.navInfo}</p>
        <ul className="nav__list">
          <li className="nav__item">
            <button
              type="button"
              className="nav__link"
              onClick={() => {
                if (page !== 1) {
                  onPageChange(page - 1);
                  this.setState({ navInfo:
        `${((page - 2) * perPage) + 1}-${(page - 1) * perPage} of ${total}` });
                }
              }}
            >
              Previous
            </button>
          </li>
          {pages.map((pageNumber, index) => (
            <li
              className={index === page - 1
                ? 'nav__item highlighted'
                : 'nav__item'}
              key={pageNumber}
            >
              <button
                type="button"
                className="nav__link"
                onClick={() => {
                  if (pageNumber !== page) {
                    onPageChange(pageNumber);
                    this.setState({ navInfo:
          `${((pageNumber - 1) * perPage) + 1}-${pages.length === pageNumber
            ? total
            : (pageNumber) * perPage}
                of ${total}` });
                  }
                }}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li className="nav__item">
            <button
              type="button"
              className="nav__link"
              onClick={() => {
                if (page !== pages.length) {
                  onPageChange(page + 1);
                  this.setState({ navInfo:
                  `${((page) * perPage) + 1}-${pages.length - 1 === page
                    ? total : (page + 1) * perPage} of ${total}` });
                }
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
