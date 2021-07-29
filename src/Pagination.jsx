import React from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

export class Pagination extends React.PureComponent {
  state = {
    total: this.props.total,
    perPage: this.props.perPage,
    page: this.props.page,
  }

  nextPage = (event) => {
    event.preventDefault();
    this.setState(state => ({ page: state.page + 1 }));
  }

  previousPage = (event) => {
    event.preventDefault();
    this.setState(state => ({ page: state.page - 1 }));
  }

  onClickHandler = (event, value) => {
    event.preventDefault();
    this.setState({ page: value });
  }

  render() {
    const { total, perPage, page } = this.state;
    const paginationCalculate = total / perPage;

    return (
      <>
        <h1>Pagination</h1>
        <p>
          {`${(page - 1) * perPage + 1}-${page * perPage} of ${total}`}
        </p>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href="/" onClick={this.previousPage}>
                Previous
              </a>
            </li>
            {[...Array(paginationCalculate).keys()].map(index => (
              <li
                key={uuid()}
                className={`page-item ${page === (index + 1) ? 'active' : ''}`}
              >
                <a
                  className="page-link"
                  href="/"
                  onClick={event => this.onClickHandler(event, index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li
              className={
                `page-item ${page === paginationCalculate ? 'disabled' : ''}`
              }
            >
              <a className="page-link" href="/" onClick={this.nextPage}>Next</a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
};
