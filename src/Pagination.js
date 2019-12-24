import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const OPTIONS = [3, 5, 10, 20];

class Pagination extends React.Component {
  state = {
    startPage: this.props.page,
    currentPage: this.props.page,
    perPage: this.props.perPage,
  };

  handleClick = (e) => {
    this.setState({
      currentPage: +e.target.value,
    });
  };

  setItemsPerPage = (e) => {
    const { value } = e.target;

    this.setState(prevState => ({
      perPage: +value,
      currentPage: prevState.startPage,
    }));
  };

  goToPrevPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage - 1,
    }));
  };

  goToNextPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { startPage, currentPage, perPage } = this.state;
    const tableDataWithIds = this.props.tableData.map((item, index) => ({
      id: index,
      data: item,
    }));
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(tableDataWithIds.length / perPage); i += 1) {
      pageNumbers.push(i);
    }

    return (
      <>
        <select
          onChange={this.setItemsPerPage}
          defaultValue={perPage}
        >
          {OPTIONS.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <ul>
          {tableDataWithIds.slice(indexOfFirstItem, indexOfLastItem).map(
            item => <li key={item.id}>{item.data}</li>
          )}
        </ul>

        <ul className="pagination">
          <li>
            {this.props.withInfo && (
              <span className="pagination__info">
                {
                  `${indexOfFirstItem + 1}-${
                    indexOfLastItem > tableDataWithIds.length
                      ? tableDataWithIds.length
                      : currentPage * perPage
                  }`
                }
              </span>
            )}
          </li>
          <li>
            <button
              type="button"
              className={cn(
                'pagination__page',
                {
                  'pagination__page--disabled':
                    currentPage === startPage,
                },
              )}
              onClick={this.goToPrevPage}
              disabled={currentPage === startPage}
            >
              Previous
            </button>
          </li>

          {pageNumbers.map(number => (
            <li key={number}>
              <button
                className={
                  cn(
                    'pagination__page',
                    { 'pagination__page--active': currentPage === number }
                  )
                }
                type="button"
                key={number}
                value={number}
                onClick={this.handleClick}
              >
                {number}
              </button>
            </li>
          ))}

          <li>
            <button
              type="button"
              className={cn(
                'pagination__page',
                {
                  'pagination__page--disabled':
                    currentPage === pageNumbers.length,
                },
              )}
              disabled={currentPage === pageNumbers.length}
              onClick={this.goToNextPage}
            >
              Next
            </button>
          </li>
        </ul>
      </>
    );
  }
}

Pagination.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.string).isRequired,
  page: PropTypes.number,
  perPage: PropTypes.number,
  withInfo: PropTypes.bool,
};

Pagination.defaultProps = {
  page: 1,
  perPage: 5,
  withInfo: false,
};

export default Pagination;
