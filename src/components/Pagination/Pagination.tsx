import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  items: string[],
  pageAmount: number,
  currentPage: number,
  onPageChange: React.MouseEventHandler<HTMLAnchorElement>,
};

export const Pagination: React.FC<Props> = ({
  items,
  pageAmount,
  currentPage,
  onPageChange,
}) => {
  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
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
            aria-disabled={currentPage === 1}
            onClick={(event) => onPageChange(event)}
          >
            «
          </a>
        </li>

        {getNumbers(1, pageAmount).map(page => {
          const isActive = page === currentPage;

          return (
            <li
              className={classNames(
                'page-item',
                {
                  active: isActive,
                },
              )}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={(event) => {
                  if (!isActive) {
                    onPageChange(event);
                  }
                }}
              >
                { page }
              </a>
            </li>
          );
        })}

        <li
          className={classNames(
            'page-item',
            {
              disabled: currentPage === pageAmount,
            },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageAmount}
            onClick={(event) => onPageChange(event)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((item: string) => (
          <li data-cy="item" key={item}>
            { item }
          </li>
        ))}
      </ul>
    </>
  );
};
