import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number | string) => void,
};

export const Pagination: React.FC<Props> = (props) => {
  const {
    perPage,
    total,
    currentPage,
    onPageChange,
  } = props;

  const lastPage = Math.ceil(total / perPage);
  const amountOfPages = getNumbers(1, lastPage);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange('prev');
              }
            }}
          >
            «
          </a>
        </li>

        {amountOfPages.map(page => (
          <li
            className={classNames(
              'page-item',
              { active: page === currentPage },
            )}
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
        ))}

        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === lastPage },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={() => {
              if (currentPage !== lastPage) {
                onPageChange('next');
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
