import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currPage: number,
  onPageChange: (page: number | string) => void,
};

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currPage,
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
            { disabled: currPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currPage === 1}
            onClick={() => {
              if (currPage !== 1) {
                onPageChange('prev');
              }
            }}
          >
            «
          </a>
        </li>

        {amountOfPages.map(page => (
          <li
            key={page}
            className={classNames(
              'page-item',
              { active: page === currPage },
            )}
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
            { disabled: currPage === lastPage },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currPage === lastPage}
            onClick={() => {
              if (currPage !== lastPage) {
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
