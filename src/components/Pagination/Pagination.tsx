import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  onPageChange,
  currentPage,
}) => {
  const totalPage = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPage }, (__dirname, i) => i + 1);
  const lastPage = currentPage === totalPage;

  const handleChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

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
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();

            if (currentPage > 1) {
              handleChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(pageNumber => {
        return (
          <li
            className={classNames('page-item', {
              active: currentPage === pageNumber,
            })}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={e => {
                e.preventDefault();

                handleChange(pageNumber);
              }}
            >
              {pageNumber}
            </a>
          </li>
        );
      })}
      <li
        className={classNames('page-item', {
          disabled: lastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();

            if (!lastPage) {
              handleChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
