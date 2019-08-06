/* eslint-disable */
import React from 'react';

class Pagination extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    if (Number(event.target.value) === Number(this.props.page)) {
      return;
    }
    this.props.changePage(Number(event.target.value));
  };

  prevNextHandleClick = (direction) => {
    const { page, totalPages } = this.props;
    if (direction === 'prev' && Number(page) === 1) {
      return;
    }
    if (direction === 'next' && Number(page) === Number(totalPages)) {
      return;
    }

    switch (direction) {
      case 'next':
        this.props.changePage(Number(page) + 1);
        break;
      case 'prev':
        this.props.changePage(Number(page) - 1);
        break;
    }
  };

  createButtonArray = (pagesCount) => {
    const buttonArr = [];

    for (let i = 1; i < pagesCount + 1; i++) {
      buttonArr.push(
        <button
          className={i === this.props.page
            ? 'Pagination__button Pagination__button--active'
            : 'Pagination__button'}
          onClick={this.handleClick}
          value={i}
        >
          {i}
        </button>
      );
    }

    return buttonArr;
  };

  handleSelect = (event) => {
    this.props.changeItemsPerPage(event.target.value);
  };

  render() {
    const { page, totalPages } = this.props;
    console.log(totalPages)
    return (
      <div className="Pagination">
        <button
          onClick={() => this.prevNextHandleClick('prev')}
          className="Pagination__button"
          disabled={Number(page) === 1}
        >
          Prev
        </button>
        {this.createButtonArray(totalPages)}
        <button
          onClick={() => this.prevNextHandleClick('next')}
          className="Pagination__button"
          disabled={Number(page) === Number(Math.ceil(totalPages))}
        >
          Next
        </button>
        <select
          className="Pagination__select"
          onChange={this.handleSelect}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    );
  }
}

export default Pagination;
