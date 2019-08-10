import React from 'react';
import propTypes from 'prop-types';
import CreateControls from './CreateControls';

class Pagination extends React.Component {
  state = {
    page: this.props.page,
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
    });
    setPageCountItems(+value.target.value);
  };

  // setCurrentPage(num) {
  //   this.setState({
  //     page: num,
  //   });
  //   this.props.changePage(num);
  // }

  render() {
    const { page, pageCount } = this.state;
    const { perPage, total } = this.props;

    return (
      <div className="pagination">
        <select
          onChange={this.onSelectChange}
          value={perPage}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <div className="pagination-controls">
          {
            <CreateControls
              pageCount={pageCount}
              page={page}
              setCurrentPage={(num) => {
                this.setState({
                  page: num,
                });
                this.props.changePage(num);
              }}
            />
          }
        </div>
        <span>
          {
            `${page * perPage - perPage + 1}
             - ${page * perPage <= total ? page * perPage : total
      } of ${total}`
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
