import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

type Props = {
  itemsOnPage: number[]
  currentPage: number;
  totalPages: number[];
  onPageChange: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Pagination: FunctionComponent<Props> = ({
  itemsOnPage,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // const isActivePage = (num: number): boolean => num === currentPage;
  const isPrevPage = currentPage === 1;
  const isNextPage = currentPage === totalPages.length;

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item', {
              disabled: isPrevPage,
            },
          )}
        >
          <a
            data-cy="prevLink"
            id="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isPrevPage}
            onClick={onPageChange}
          >
            «
          </a>
        </li>

        {totalPages.map((pageNum) => (
          <li
            className={classNames(
              'page-item',
              { active: pageNum === currentPage },
            )}
            key={pageNum}
          >
            <a
              data-cy="pageLink"
              className={classNames(
                'page-link',
                { 'is-active': pageNum === currentPage },
              )}
              href={`#${pageNum}`}
              onClick={onPageChange}
            >
              {pageNum}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item', {
              disabled: isNextPage,
            },
          )}
        >
          <a
            data-cy="nextLink"
            id="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages.length}
            onClick={onPageChange}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnPage.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
