import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class Pagination extends Component {
  state = {
    selectedPage: this.props.page,
    totalPageCount: Math.ceil(this.props.total / this.props.perPage),
    firstPage: this.props.page,
    alphabetLetters: this.props.alphabetLetters,
  }

  setNumber = pageNumber => () => {
    this.setState({
      selectedPage: pageNumber,
    });
  }

  prevNumber = () => {
    if (this.state.selectedPage <= this.state.firstPage) {
      return;
    }

    this.setState(prevState => ({
      selectedPage: prevState.selectedPage - 1,
    }));
  }

  nextNumber = () => {
    if (this.state.selectedPage >= this.state.totalPageCount) {
      return;
    }

    this.setState(prevState => ({
      selectedPage: prevState.selectedPage + 1,
    }));
  }

  render() {
    const {
      selectedPage,
      alphabetLetters,
      totalPageCount,
    } = this.state;
    const { perPage } = this.props;
    const pages = Array.from({ length: totalPageCount }, (_, i) => i + 1);
    const indexOfLastItem = selectedPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = alphabetLetters.slice(
      indexOfFirstItem, indexOfLastItem,
    );

    const RenderData = ({ items }) => (
      items.map(item => (
        <li
          key={item}
          className="list-group-item"
        >
          {item}
        </li>
      ))
    );

    return (
      <>
        <ul
          className={classNames(
            'list',
            'list-group',
            'list-group-horizontal',
            'justify-content-center',
          )}
        >
          <RenderData items={currentItems} />
        </ul>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li
              className={classNames(
                'page-item',
                { disabled: this.state.firstPage === this.state.selectedPage },
              )}
            >
              <button
                type="button"
                className="page-link"
                onClick={this.prevNumber}
              >
                Previous
              </button>
            </li>

            {pages.map(page => (
              <li
                className={classNames(
                  'page-item',
                  { active: selectedPage === page },
                )}
                key={page}
                id={page}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={this.setNumber(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li
              className={classNames(
                'page-item',
                {
                  disabled:
                    this.state.totalPageCount === this.state.selectedPage,
                },
              )}
            >
              <button
                type="button"
                className="page-link"
                onClick={this.nextNumber}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  alphabetLetters: PropTypes.instanceOf(Array).isRequired,
};
