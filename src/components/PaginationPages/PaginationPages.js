import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export class PaginationPages extends PureComponent {
  get pages() {
    const pagesList = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < this.props.pagesQuantity + 1; i++) {
      if (this.#checkIndex(i)) {
        const prev = pagesList[pagesList.length - 1];

        if (prev && prev + 1 !== i) {
          pagesList.includes(-1) ? pagesList.push(0) : pagesList.push(-1);
        }

        pagesList.push(i);
      }
    }

    return pagesList;
  }

  #checkIndex = i => (
    i === 1 || i === this.props.pagesQuantity || i === this.props.page
    || i === this.props.page + 1 || i === this.props.page - 1
  )

  render() {
    return (
      <>
        {
          this.pages.map(pageNumber => (
            <li
              className={
                `page-item ${this.props.page === pageNumber && 'active'}`
              }
              key={pageNumber}
            >
              {
                pageNumber > 0
                  ? (
                    <NavLink
                      to={`/?page=${pageNumber}&perPage=${this.props.perPage}`}
                      className="page-link"
                    >
                      {pageNumber}
                    </NavLink>
                  )
                  : (
                    <span className="page-link disabled">...</span>
                  )
              }
            </li>
          ))
        }
      </>
    );
  }
}

PaginationPages.propTypes = {
  pagesQuantity: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
