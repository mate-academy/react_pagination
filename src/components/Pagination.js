import React from 'react';
import PropTypes from 'prop-types';
import PageButton from './PageButton';

const genereatePageButtons = (amount) => {
  const result = [];

  for (let i = 1; i <= amount; i += 1) {
    result.push(i);
  }

  return result;
};

const Pagination = ({
  totalItemsAmount,
  itemsPerPage,
  currentPage,
  onSwitchPage,
  firstItem,
  lastItem,
}) => {
  const pagesAmount = Math.ceil(totalItemsAmount / itemsPerPage);
  const pageButtons = genereatePageButtons(pagesAmount);
  const firstPage = pageButtons[0];
  const lastPage = pageButtons[pageButtons.length - 1];
  const preCurrentPage = currentPage - 1;
  const postCurrentPage = currentPage + 1;
  const lastItemOnPage = lastItem > totalItemsAmount
    ? totalItemsAmount
    : lastItem;

  return (
    <div className="paginator">
      <button
        className="paginator__prev-btn"
        type="button"
        onClick={() => onSwitchPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageButtons.map((page) => {
        if (page === firstPage || page === lastPage) {
          if (page === currentPage) {
            return (
              <PageButton
                onSwitch={() => onSwitchPage(page)}
                page={page}
              >
                {`<${page}>`}
              </PageButton>
            );
          }

          return (
            <PageButton
              onSwitch={() => onSwitchPage(page)}
              page={page}
            >
              {page}
            </PageButton>
          );
        }

        if (page === currentPage) {
          return (
            <PageButton
              onSwitch={() => onSwitchPage(page)}
              page={page}
            >
              {`<${page}>`}
            </PageButton>
          );
        }

        if (page === preCurrentPage) {
          if (page === firstPage + 1) {
            return (
              <PageButton
                onSwitch={() => onSwitchPage(page)}
                page={page}
              >
                {page}
              </PageButton>
            );
          }

          return (
            <PageButton
              onSwitch={() => onSwitchPage(page)}
              page={page}
            >
              {`...${page}`}
            </PageButton>
          );
        }

        if (page === postCurrentPage) {
          if (page === lastPage - 1) {
            return (
              <PageButton
                onSwitch={() => onSwitchPage(page)}
                page={page}
              >
                {page}
              </PageButton>
            );
          }

          return (
            <PageButton
              onSwitch={() => onSwitchPage(page)}
              page={page}
            >
              {`${page}...`}
            </PageButton>
          );
        }

        return '';
      })}

      <button
        className="paginator__prev-btn"
        type="button"
        onClick={() => onSwitchPage(currentPage + 1)}
        disabled={currentPage === pagesAmount}
      >
        Next
      </button>

      <p>
        {`Items: from ${firstItem} to ${lastItemOnPage} of ${totalItemsAmount}`}
      </p>
    </div>
  );
};

Pagination.propTypes = {
  totalItemsAmount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  firstItem: PropTypes.number.isRequired,
  lastItem: PropTypes.number.isRequired,
  onSwitchPage: PropTypes.func.isRequired,
};

export default Pagination;
