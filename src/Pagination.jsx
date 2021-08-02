import React from 'react';
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

  onChangeHandler = (event) => {
    const { value } = event.target;

    if (this.state.perPage !== value) {
      this.setState({
        page: 1,
        perPage: +value,
      });
    }
  }

  renderPagination() {
    const { total, perPage, page } = this.state;
    const paginationCalculate = total / perPage;

    const paginationList = [];

    for (let i = 0; i < paginationCalculate; i += 1) {
      paginationList.push((
        <li
          key={i}
          className={`page-item ${page === (i + 1) ? 'active' : ''}`}
        >
          <a
            className="page-link"
            href="/"
            onClick={event => this.onClickHandler(event, i + 1)}
          >
            {i + 1}
          </a>
        </li>
      ));
    }

    return paginationList;
  }

  render() {
    const { total, perPage, page } = this.state;

    return (
      <>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ width: '150px' }}
          value={perPage}
          onChange={this.onChangeHandler}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <p>
          {`${(page - 1) * perPage + 1}
          - ${page * perPage > total ? total : page * perPage}
            of ${total}`}
        </p>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href="/" onClick={this.previousPage}>
                Previous
              </a>
            </li>
            {this.renderPagination()}
            <li
              className={
                `page-item
                ${page === this.renderPagination().length ? 'disabled' : ''}`
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
