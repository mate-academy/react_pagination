import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import { PrevPage } from '../PrevPage/PrevPage';
import { NextPage } from '../NextPage/NextPage';
import { Content } from '../Content/Content';
import './Pagination.css';

export class Pagination extends React.Component {
  state = {
    selectedPage: 1,
  }

  onPageChange = (page) => {
    this.setState({ selectedPage: page });
  }

  pageHandler = (event) => {
    const { textContent } = event.target;
    event.preventDefault();
    this.onPageChange(+textContent);
  }

  nextPageHandler = (pagesQuantity) => {
    this.setState((prevState) => {
      if (prevState.selectedPage === pagesQuantity) {
        return 0;
      }

      return {
        selectedPage: prevState.selectedPage + 1,
      };
    });
  }

  prevPageHandler = () => {
    this.setState((prevState) => {
      if (prevState.selectedPage === 1) {
        return 0;
      }

      return {
        selectedPage: prevState.selectedPage - 1,
      };
    });
  }

  render() {
    const { selectedPage } = this.state;
    const { total, perPage, withInfo } = this.props;

    const pagesQuantity = Math.ceil(total / perPage);
    const pages = Array(pagesQuantity).fill(1);

    return (  
      <>
        <ul className="pagination">
          <PrevPage selectedPage={selectedPage} prevPageHandler={this.prevPageHandler} />
          {pages.map((_, i) => (
            <li
              key={i + 1}
              className={classNames(
                'page-item',
                { active: (i + 1) === selectedPage },
              )}
              onClick={this.pageHandler}
            >
              <a
                className="page-link"
                href={(i + 1)}
              >
                {i + 1}
              </a>
            </li>
          ))
          }
          <NextPage
            pagesQuantity={pagesQuantity}
            selectedPage={selectedPage}
            nextPageHandler={this.nextPageHandler}
          />
        </ul>
        {withInfo && <Content />}
      </>
    )
  }
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  withInfo: PropTypes.bool.isRequired,
};
