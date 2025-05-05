import React from 'react';
import { getNumbers } from '../../utils';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const tabsLength: number = Math.ceil(total / perPage);
  const tabsList = getNumbers(1, tabsLength);

  return (
    <>
      {/* Move this markup to Pagination */}
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
            onClick={() => {
              if (currentPage - 1 > 0) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {tabsList.map(page => {
          return (
            <li
              className={classNames('page-item', {
                active: page === currentPage,
              })}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={classNames('page-item', {
            disabled: currentPage === tabsLength,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === tabsLength}
            onClick={() => {
              if (currentPage + 1 <= tabsLength) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
