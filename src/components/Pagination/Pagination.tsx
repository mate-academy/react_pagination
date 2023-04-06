import React from 'react';
import classNames from 'classnames';
import { getPages, getArrOfItemsForCurrPage } from '../../utils';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (event: React.MouseEvent<HTMLAnchorElement>) => void
};

export const Pagination: React.FC<Props> = React.memo(
  ({
    total,
    perPage,
    currentPage,
    onPageChange,
  }) => {
    const pages = getPages(total, perPage);

    const arrOfItems = getArrOfItemsForCurrPage(42, perPage, currentPage);

    return (
      <>
        <ul className="pagination">
          <li className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
          >
            <a
              data-cy="prevLink"
              className="page-link"
              href="#prev"
              aria-disabled={currentPage === 1}
              data-name="currentPage"
              data-value={+currentPage - 1}
              onClick={onPageChange}
            >
              «
            </a>
          </li>

          {pages.map(page => (
            <li
              className={classNames(
                'page-item',
                { active: +currentPage === page },
              )}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                data-name="currentPage"
                data-value={page}
                onClick={onPageChange}
              >
                {page}
              </a>
            </li>
          ))}
          <li className={classNames(
            'page-item',
            { disabled: currentPage === pages.length },
          )}
          >
            <a
              data-cy="nextLink"
              className="page-link"
              href="#next"
              aria-disabled={currentPage === pages.length}
              data-name="currentPage"
              data-value={+currentPage + 1}
              onClick={onPageChange}
            >
              »
            </a>
          </li>
        </ul>
        <ul>
          {arrOfItems.map(item => (
            <li key={item} data-cy="item">{`Item ${item}`}</li>
          ))}
        </ul>
      </>
    );
  },
);
