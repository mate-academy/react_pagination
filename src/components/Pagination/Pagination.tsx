import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  activePage: number,
  pagesQuantity: number,
  itemsOnCurrentPage: number[],
  onPageChange: (page: number) => void,
  onPrevPage: (page: number) => void,
  onNextPage: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  activePage,
  pagesQuantity,
  itemsOnCurrentPage,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  const arrayOfPages = getNumbers(1, pagesQuantity);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            {
              disabled: activePage === 1,
            },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${activePage}`}
            aria-disabled="true"
            onClick={() => onPrevPage(activePage)}
          >
            «
          </a>
        </li>

        {arrayOfPages.map(pageNumber => (
          <li
            className={classNames(
              'page-item',
              { active: activePage === pageNumber },
            )}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${activePage}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item',
            { disabled: pagesQuantity === activePage },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${activePage}`}
            aria-disabled="false"
            onClick={() => onNextPage(activePage)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnCurrentPage.map(item => (
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
