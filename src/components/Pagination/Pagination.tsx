import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesQuantity = Math.ceil(total / perPage);
  const arrayOfPages = getNumbers(1, pagesQuantity);

  return (
    <>
      <ul
        className="pagination"
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={classNames('page-item', {
            disabled: currentPage <= 1,
          })}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange((currentPage - 1));
            }
          }}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {arrayOfPages.map(page => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
          <li
            className={classNames('page-item', {
              active: page === currentPage,
            })}
            onClick={() => {
              onPageChange(page);
            }}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
            >
              {page}
            </a>
          </li>
        ))}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={classNames('page-item', {
            disabled: currentPage >= pagesQuantity,
          })}
          onClick={() => {
            if (currentPage < pagesQuantity) {
              onPageChange((currentPage + 1));
            }
          }}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesQuantity}

          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
