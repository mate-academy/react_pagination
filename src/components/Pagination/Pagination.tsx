import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const pageLinkCount = Math.ceil(total / perPage);
  const pageLinkData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= pageLinkCount; i++) {
    pageLinkData.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageLinkCount;

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevButtonClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: isFirstPage,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handlePrevButtonClick}
        >
          «
        </a>
      </li>

      {pageLinkData.map(pageLink => (
        <li
          className={classNames(
            'page-item',
            {
              active: currentPage === pageLink,
            },
          )}
          key={pageLink}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageLink}`}
            onClick={() => handlePageClick(pageLink)}
          >
            {pageLink}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          {
            disabled: isLastPage,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleNextButtonClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
