import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PageContent } from '../PageContent';

import './Pagination.scss';

export class Pagination extends React.PureComponent {
  createNumberSequence = maxNumber => (
    Array(maxNumber).fill(0).map((_, index) => index + 1)
  )

  fillContent = (page) => {
    const content = [];
    const {
      total,
      perPage,
    } = this.props;
    const firstContentItem = ((page - 1) * perPage) + 1;

    // eslint-disable-next-line no-plusplus
    for (let i = firstContentItem; i < (firstContentItem + perPage); i++) {
      content.push(i);
    }

    return content.filter(num => num <= total);
  }

  previousButtonHandler = () => {
    const {
      page,
      onPageChange,
    } = this.props;

    return onPageChange(page - 1);
  }

  nextButtonHandler = () => {
    const {
      page,
      onPageChange,
    } = this.props;

    return onPageChange(page + 1);
  }

  render() {
    const {
      total,
      page,
      perPage,
      onPageChange,
      withInfo,
    } = this.props;

    const pageContent = this.fillContent(page);
    const maxPage = Math.ceil(total / perPage);
    const pages = this.createNumberSequence(maxPage);

    return (
      <>
        {withInfo && (
          <p className="visibleItems">
            {`
              ${pageContent[0]} - 
              ${pageContent[perPage - 1] || total}
              of ${total}
            `}
          </p>
        )}

        <ul className="pagination">
          <li className="pagination__item">
            <button
              className="pagination__link"
              type="button"
              onClick={this.previousButtonHandler}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>

          {pages.map(pageNumber => (
            <li className="pagination__item" key={pageNumber}>
              <button
                className={classNames(
                  'pagination__link',
                  { pagination__link_active: pageNumber === page },
                )}
                type="button"
                onClick={() => (
                  onPageChange(pageNumber)
                )}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          <li className="pagination__item">
            <button
              className="pagination__link"
              type="button"
              onClick={this.nextButtonHandler}
              disabled={page === maxPage}
            >
              Next
            </button>
          </li>
        </ul>

        <PageContent pageContent={pageContent} />
      </>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  withInfo: PropTypes.bool,
};

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
  withInfo: false,
};
