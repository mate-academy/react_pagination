import React from 'react';
import classNames from 'classnames';

type Callback = (page: number) => number;

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number | Callback) => void,
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

    onPageChange(prevPage => prevPage - 1);
  }

  function moveToNextPage() {
    if (currentPage === totalPages) {
      return;
    }

    onPageChange(prevPage => prevPage + 1);
  }

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={moveToPreviousPage}
        >
          «
        </a>
      </li>

      {pagesArray.map((pageNo: number) => (
        <li
          key={pageNo}
          className={classNames('page-item', {
            active: pageNo === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNo}`}
            onClick={() => onPageChange(pageNo)}
          >
            {pageNo}
          </a>
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
