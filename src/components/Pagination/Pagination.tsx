import classNames from 'classnames';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';

type Types = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Types> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countOfPages: number[] = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, index) => index + 1,
  );

  return (
    <React.Fragment>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <Link
            data-cy="prevLink"
            className="page-link"
            to={`?page=${currentPage - 1}&perPage=${perPage}`}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </Link>
        </li>
        {countOfPages.map(element => {
          return (
            <li
              className={classNames('page-item', {
                active: element === currentPage,
              })}
              key={`li: ${element}`}
              onClick={() => {
                onPageChange(element);
              }}
            >
              <Link
                className="page-link"
                to={`?page=${element}&perPage=${perPage}`}
                data-cy="pageLink"
              >
                {element}
              </Link>
            </li>
          );
        })}

        <li
          className={classNames('page-item', {
            disabled: currentPage === countOfPages.length,
          })}
        >
          <Link
            data-cy="nextLink"
            className="page-link"
            to={`?page=${currentPage + 1}&perPage=${perPage}`}
            aria-disabled={
              currentPage === countOfPages.length ? 'true' : 'false'
            }
            onClick={() => {
              if (currentPage < countOfPages.length) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};
