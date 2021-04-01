import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class Pagination extends Component {
  state = {
    selectedPage: this.props.page,
  }

  totalPageCount = Math.ceil(this.props.total / this.props.perPage);

  firstPage = this.props.page;

  alphabetLetters = this.props.alphabetLetters;

  pages = Array.from(new Array(this.totalPageCount), (_, i) => i + 1);

  setActivePage = pageNumber => () => {
    this.setState({
      selectedPage: pageNumber,
    });
  }

  chosePrevPage = () => {
    if (this.state.selectedPage <= this.firstPage) {
      return;
    }

    this.setState(prevState => ({
      selectedPage: prevState.selectedPage - 1,
    }));
  }

  choseNextPage = () => {
    if (this.state.selectedPage >= this.totalPageCount) {
      return;
    }

    this.setState(prevState => ({
      selectedPage: prevState.selectedPage + 1,
    }));
  }

  render() {
    const {
      selectedPage,
    } = this.state;
    const { perPage } = this.props;
    const indexOfLastItem = selectedPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = this.alphabetLetters.slice(
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
                { disabled: this.firstPage === this.state.selectedPage },
              )}
            >
              <button
                type="button"
                className="page-link"
                onClick={this.chosePrevPage}
              >
                Previous
              </button>
            </li>

            {this.pages.map(page => (
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
                  onClick={this.setActivePage(page)}
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
                    this.totalPageCount === this.state.selectedPage,
                },
              )}
            >
              <button
                type="button"
                className="page-link"
                onClick={this.choseNextPage}
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
