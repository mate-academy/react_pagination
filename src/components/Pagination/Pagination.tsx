import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages: number = Math.ceil(total / perPage);
  const pagesArray = Array.from(
    { length: totalPages },
    (_value, index) => index + 1,
  );

  function moveToPreviousPage() {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  }

  function moveToNextPage() {
    if (currentPage === totalPages) {
      return;
    }

    onPageChange(currentPage + 1);
  }

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <button
          data-cy="prevLink"
          className="page-link"
          disabled={currentPage === 1}
          type="button"
          onClick={moveToPreviousPage}
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </button>
      </li>

      {pagesArray.map((pageNo: number) => (
        <li
          key={pageNo}
          className={classNames('page-item', {
            active: pageNo === currentPage,
          })}
        >
          <button
            data-cy="pageLink"
            className="page-link"
            type="button"
            onClick={() => onPageChange(pageNo)}
          >
            {pageNo}
          </button>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={moveToNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
