import { getNumbers } from '../../utils';
import classNames from 'classnames';
import React from 'react';

interface PaginationProps {
  total: number;
  perPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onSelectChange: (perPage: number) => void;
}

const SELECT_OPTIONS = [3, 5, 10, 20];
const DEFAULT_PER_PAGE = 5;
const FIRST_PAGE = 1;

export const Pagination = ({
  total,
  perPage = DEFAULT_PER_PAGE,
  currentPage = FIRST_PAGE,
  onPageChange,
  onSelectChange,
}: PaginationProps) => {
  const pageCount = Math.ceil(total / perPage);
  const pageList: number[] = getNumbers(1, pageCount);

  function handlePageChange(
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) {
    event.preventDefault();

    if (page === currentPage) {
      return;
    }

    if (page < 1 || page > pageCount) {
      return;
    }

    onPageChange(page);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = event.currentTarget.value;

    onSelectChange(Number(value));
  }

  return (
    <>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelectChange}
          >
            {SELECT_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
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
            onClick={event => handlePageChange(event, currentPage - 1)}
          >
            «
          </a>
        </li>
        {pageList.map(page => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={event => handlePageChange(event, page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === pageCount,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageCount}
            onClick={event => handlePageChange(event, currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
