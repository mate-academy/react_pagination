import React from 'react';

class Pagination extends React.Component {
  handleClick = (event) => {
    event.preventDefault();

    if (Number(event.target.value) === Number(this.props.page)) {
      return;
    }

    this.props.setCurrentPage(Number(event.target.value));
  };

  handleClickPrevNextDirection = (direction) => {
    const { page, totalPages } = this.props;

    if (direction === 'prev' && Number(page) === 1) {
      return;
    }

    if (direction === 'next' && Number(page) === Number(totalPages)) {
      return;
    }

    switch (direction) {
      case 'next':
        this.props.setCurrentPage(Number(page) + 1);

        return;
      case 'prev':
        this.props.setCurrentPage(Number(page) - 1);
    }
  };

  paginationButtons = (pagesCount) => {
    const buttons = [];

    for (let i = 1; i < pagesCount + 1; i++) {
      buttons.push(
        <button
          className={i === this.props.page
            ? 'pagination_button pagination_button-selected'
            : 'pagination_button'}
          onClick={this.handleClick}
          value={i}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  handleSelect = (event) => {
    this.props.changeItemsPerPage(event.target.value);
  };

  render() {
    const { page, totalPages } = this.props;

    return (
      <div className="pagination">
        <button
          onClick={() => this.handleClickPrevNextDirection('prev')}
          className="pagination_button-direction"
          disabled={Number(page) === 1}
        >
          Prev
        </button>
        {this.paginationButtons(totalPages)}
        <button
          onClick={() => this.handleClickPrevNextDirection('next')}
          className="pagination_button-direction"
          disabled={Number(page) === Number(totalPages)}
        >
          Next
        </button>
        <div className="pagination_select ">
          View
          <select
            className="pagination_select-select"
            onChange={this.handleSelect}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          posts
        </div>
      </div>
    );
  }
}

export default Pagination;
