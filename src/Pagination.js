import React from 'react';

class Pagination extends React.Component {
  handleClick = (event) => {
    event.preventDefault();

    if (Number(event.target.value) !== Number(this.props.page)) {
      this.props.setActivePage(Number(event.target.value));
    }
  };

  paginationButtons = (pagesCount) => {
    const buttons = [];

    for (let i = 1; i < pagesCount + 1; i++) {
      buttons.push(
        <button
          type="button"
          className={i === this.props.page
            ? 'pagination_button pagination_button-selected'
            : 'pagination_button'}
          onClick={this.handleClick}
          value={i}
          disabled={this.props.page === i}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  handleSelect = (event) => {
    this.props.changeRowsPerPage(event.target.value);
  };

  render() {
    const { total, page, visibleRows, totalRows } = this.props;
    const idArray = visibleRows.map(row => row.id);
    const range = [Math.min(...idArray), Math.max(...idArray)];

    return (
      <div className="new">
        <nav>
          <div className="pagination">
            <div className="pagination_select select-count">
              Rows per page:
                <select
                className="pagination_select-select"
                onChange={this.handleSelect}
              >
                <option value={20}>20</option>
                <option value={10}>10</option>
                <option value={5}>5</option>
              </select>

            </div>

            <div className="show-count">
              {`${range[0]}-${range[1]} of ${totalRows}`}
            </div>
            <div className="button-count">
              <button
                type="button"
                className="pagination_button-direction"
                disabled={Number(page) === 1}
              >
                Prev
        </button>
              {this.paginationButtons(total)}
              <button
                type="button"
                className="pagination_button-direction"
                disabled={Number(page) === Number(total)}
              >
                Next
        </button>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Pagination;
