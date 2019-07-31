import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  URL = 'https://loremflickr.com/320/240?lock=';

  state = {
    page: 1,
    pages: [],
    total: this.props.total,
    perPage: this.props.perPage,
  }

  contentPerPage = [
    { label: '...' },
    { label: 1 },
    { label: 2 },
    { label: 3 },
    { label: 4 },
    { label: 5 },
    { label: 6 },
    { label: 9 },
  ]

  componentWillMount() {
    const { perPage, total } = this.state;
    const pagesNum = Math.ceil(total / perPage);

    this.setState({
      pages: Array.from(
        { length: pagesNum }, (a, b) => b + 1
      ),
    });
  }

  handlePrev = () => {
    this.setState(state => ({ page: state.page - 1 }));
  }

  handleNext = () => {
    this.setState(state => ({ page: state.page + 1 }));
  }

  handleNum = (event) => {
    const val = event.target.id;

    this.setState({ page: +val });
  }

  toggleContentPerPage = (event) => {
    const { value } = event.target;
    const { perPage, total } = this.state;
    const pagesNum = Math.ceil(total / perPage);

    this.setState({
      pages: Array.from({ length: pagesNum }, (a, b) => b + 1),
      perPage: +value,
    });
  }

  handleTotalContent = (event) => {
    const totalValue = event.target.value;
    const { perPage, total } = this.state;
    const pagesNum = Math.ceil(total / perPage);

    this.setState({
      pages: Array.from({ length: pagesNum }, (a, b) => b + 1),
      total: +totalValue,
    });
  }

  render() {
    const { pages, page, perPage } = this.state;

    return (
      <div className="main-table">
        <div className="content">
          {Array.from({ length: perPage }, (a, b) => b + 1).map(item => (
            <img src={`${this.URL}${page}${item}`} alt="cats" key={item} />
          ))}
        </div>

        <div className="pagination-box">
          <ul className="pagination-panel">
            <li>
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => this.handlePrev()}
              >
                &laquo;
              </button>
            </li>

            {pages.map((pageItem, index) => (
              <li key={Date.now() * Math.random()}>
                {
                  <button
                    type="button"
                    className={index + 1 === page ? 'active' : ''}
                    id={index + 1}
                    onClick={this.handleNum}
                  >
                    {pageItem}
                  </button>
                }
              </li>
            ))}

            <li>
              <button
                type="button"
                onClick={this.handleNext}
                disabled={page > pages.length - 1}
              >
                &raquo;
              </button>
            </li>
            <select
              defaultValue={perPage}
              onChange={this.toggleContentPerPage}
              title="perPage"
            >
              {this.contentPerPage.map(item => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </ul>
          <div className="total-range">
            <input
              onChange={this.handleTotalContent}
              value={this.state.total}
              type="range"
              min="10"
              max="100"
              step={10}
              title={`total - ${this.state.total}`}
            />
          </div>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
