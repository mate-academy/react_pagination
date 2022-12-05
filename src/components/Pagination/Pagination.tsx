import React, { FC } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: FC<Props> = React.memo(
  ({
    total,
    perPage,
    currentPage,
    onPageChange,
  }) => {
    const countOfPages = Math.ceil(total / perPage);

    const pageList = getNumbers(1, countOfPages);

    const prevButtonIsDisabled = currentPage === 1;

    const nextButtonIsDisabled = currentPage === countOfPages;

    return (
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disabled: prevButtonIsDisabled },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={prevButtonIsDisabled}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pageList.map(pageNumber => (
          <li
            className={classNames(
              'page-item',
              { active: pageNumber === currentPage },
            )}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={() => {
                if (currentPage !== pageNumber) {
                  onPageChange(pageNumber);
                }
              }}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li className={classNames(
          'page-item',
          { disabled: nextButtonIsDisabled },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={nextButtonIsDisabled}
            onClick={() => {
              if (currentPage !== countOfPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    );
  },
);
