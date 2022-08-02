import React, { memo } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../utils';

interface Props {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage,
  onChangePage,
}) => {
  const lastPage = Math.ceil(total / itemsPerPage);
  const pages = getNumbers(1, Math.ceil(lastPage));

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => {
              if (currentPage !== 1) {
                onChangePage(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={classNames(
              'page-item',
              {
                active: page === currentPage,
              },
            )}
          >
            <a
              href="#1"
              className="page-link"
              data-cy="pageLink"
              onClick={() => {
                if (page !== currentPage) {
                  onChangePage(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={classNames(
          'page-item',
          {
            disabled: currentPage === lastPage,
          },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={() => {
              if (currentPage !== lastPage) {
                onChangePage(currentPage + 1);
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

export default memo(Pagination);
