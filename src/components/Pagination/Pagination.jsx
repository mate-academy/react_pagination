import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import './Pagination.css';
import { Button } from '../Button';

export class Pagination extends React.Component {
  makePageCollection = () => {
    const pagesCollection = [];
    const { total, perPage, page } = this.props;
    const pagesAmount = Math.ceil(total / perPage);
    let counter = 1;

    while (counter <= pagesAmount) {
      if (counter === 1
        || counter === page
        || counter === page - 1
        || counter === page + 1
        || counter === pagesAmount) {
        pagesCollection.push(counter);
      } else if (pagesCollection[pagesCollection.length - 1] !== '...') {
        pagesCollection.push('...');
      }

      counter += 1;
    }

    return pagesCollection;
  }

  onPreviousPage = () => {
    const { page, onPageChange } = this.props;

    if (page - 1 >= 0) {
      onPageChange(page - 1);
    }
  }

  onSelectPage = (event) => {
    const {
      onPageChange,
    } = this.props;
    const currentPage = Number(event.target.innerText);

    onPageChange(currentPage);
  }

  onNextPage = () => {
    const {
      total,
      perPage,
      page,
      onPageChange,
    } = this.props;
    const pagesAmount = Math.ceil(total / perPage);

    if (page + 1 <= pagesAmount) {
      onPageChange(page + 1);
    }
  }

  render() {
    const {
      total,
      perPage,
      page,
    } = this.props;
    const pagesCollection = this.makePageCollection();
    const prevClass = classNames({
      'page-item': true,
      disabled: page === 1,
    });
    const nextClass = classNames({
      'page-item': true,
      disabled: page === pagesCollection[pagesCollection.length - 1],
    });
    const currentPageItemRangeStart = (page - 1) * perPage + 1;
    const currentPageItemRangeEnd = (page - 1) * perPage + perPage > total
      ? total
      : (page - 1) * perPage + perPage;
    const currentPageItemsRange = `${currentPageItemRangeStart}
    - ${currentPageItemRangeEnd}`;
    const currentPageInfo = `( ${currentPageItemsRange} of ${total} )`;

    return (
      <nav aria-label="Page navigation example">
        <p className="pages-info">{currentPageInfo}</p>
        <ul className="pagination">
          <li className={prevClass}>
            <Button innerText="Previous" action={this.onPreviousPage} />
          </li>
          {
            pagesCollection.map((currentPage) => {
              const pageClass = classNames({
                'page-item': true,
                active: currentPage === page,
                disabled: currentPage === '...',
              });

              return (
                <li key={uuidv4()} className={pageClass}>
                  <Button innerText={currentPage} action={this.onSelectPage} />
                </li>
              );
            })
          }
          <li className={nextClass}>
            <Button innerText="Next" action={this.onNextPage} />
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
