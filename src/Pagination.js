import React from 'react';
import propTypes from 'prop-types';

class Pagination extends React.Component {
  state = {
    page: this.props.page,
    pageCount: this.props.total % this.props.perPage > 0
      ? this.props.total / this.props.perPage + 1
      : this.props.total / this.props.perPage,
  };

  componentDidMount() {
    const { total } = this.props;
    const { perPage } = this.props;
    let pageCount = total / perPage;

    if (total % perPage > 0) { pageCount += 1; }

    this.setState({
      pageCount,
    });
  }

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
            key="first"
            type="button"
            disabled={i === this.state.page}
            onClick={() => this.setCurrentPage(1)}
          >
            {`<<`}
          </button>
        );
      }

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

      if (i === pageCount) {
        controls.push(
          <button
            key="last"
            type="button"
            disabled={i === this.state.page}
            onClick={() => this.setCurrentPage(this.state.pageCount)}
          >
            {`>>`}
          </button>
        );
      }
    }

    return controls;
  }

  render() {
    return (
      <div className="pagination">
        <div className="pagination-controls">
          {this.createControls()}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  total: propTypes.number.isRequired,
  changePage: propTypes.func.isRequired,
  perPage: propTypes.number.isRequired,
  page: propTypes.number.isRequired,
};

export default Pagination;
