import React from 'react';
import propTypes from 'prop-types';

class Pagination extends React.Component {
  state = {
    page: this.props.page,
    perPage: this.props.perPage,
  };

  componentDidMount() {
    const { total, perPage } = this.props;
    let pageCount = total / perPage;

    if (total % perPage > 0) { pageCount += 1; }

    this.setState({
      pageCount,
    });
  }

  onSelectChange = (value) => {
    const { total, setPageCountItems } = this.props;
    const perPage = +value.target.value;
    let pageCount = total / perPage;

    pageCount = Math.ceil(pageCount);

    this.setState({
      pageCount,
      page: 1,
      perPage,
    });
    setPageCountItems(+value.target.value);
  };

  setCurrentPage(num) {
    this.props.changePage(num);
    this.setState({
      page: num,
    });
  }

  createControls() {
    const controls = [];
    const { pageCount } = this.state;

    for (let i = 1; i <= pageCount; i += 1) {
      const baseClassName = 'pagination-controls__button';
      const activeClassName
        = i === this.state.page
          ? `${baseClassName}--active`
          : '';

      if (i === 1) {
        controls.push(
          <button
            key="lowerPage"
            type="button"
            disabled={i === this.state.page}
            onClick={() => this.setCurrentPage(this.state.page - 1)}
          >
            {`<`}
          </button>
        );
      }

      if (i === 1 && this.state.page > 2) {
        controls.push(
          <button
            key="first"
            type="button"
            disabled={i === this.state.page}
            onClick={() => this.setCurrentPage(1)}
          >
            {i}
          </button>
        );
      }

      if (i === 1 && this.state.page > 2) {
        controls.push(`...`);
      }

      if (
        i === this.state.page
        || i === this.state.page - 1
        || i === this.state.page + 1
      ) {
        controls.push(
          <button
            key={i}
            type="button"
            className={`${baseClassName} ${activeClassName}`}
            disabled={i === this.state.page}
            onClick={() => this.setCurrentPage(i)}
          >
            {i}
          </button>
        );
      }

      if (
        i === this.state.pageCount
        && this.state.page < this.state.pageCount - 1
      ) {
        controls.push(`...`);
      }

      if (i === pageCount && this.state.page < this.state.pageCount - 1) {
        controls.push(
          <button
            key="last"
            type="button"
            disabled={i === this.state.page}
            onClick={() => this.setCurrentPage(this.state.pageCount)}
          >
            {i}
          </button>
        );
      }

      if (i === pageCount) {
        controls.push(
          <button
            key="upperPage"
            type="button"
            disabled={i === this.state.page}
            onClick={() => this.setCurrentPage(this.state.page + 1)}
          >
            {`>`}
          </button>
        );
      }
    }

    return controls;
  }

  render() {
    return (
      <div className="pagination">
        <select
          onChange={this.onSelectChange}
          value={this.state.perPage}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <div className="pagination-controls">
          {this.createControls()}
        </div>
        <span>
          {
            `${this.state.page * this.props.perPage - this.props.perPage + 1}
             - ${
      this.state.page * this.props.perPage <= this.props.total
        ? this.state.page * this.props.perPage
        : this.props.total
      } of ${this.props.total}`
          }
        </span>
      </div>
    );
  }
}

Pagination.propTypes = {
  total: propTypes.number.isRequired,
  changePage: propTypes.func.isRequired,
  setPageCountItems: propTypes.func.isRequired,
  perPage: propTypes.number.isRequired,
  page: propTypes.number.isRequired,
};

export default Pagination;
