import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  items: string [],
  first: number,
  last: number
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  items,
  first,
  last,
}) => {
  const numberOfPages: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    numberOfPages.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className="page-item">
          <a
            data-cy="prevLink"
            className={classNames(
              'page-link',
              { disabled: currentPage === 1 },
            )}
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {numberOfPages.map(numberOfPage => (
          <li
            className={classNames(
              'page-item',
              { active: currentPage === numberOfPage },
            )}
            key={numberOfPage}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${numberOfPage}`}
            >
              {numberOfPage}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            data-cy="nextLink"
            className={classNames(
              'page-link',
              { disabled: currentPage === numberOfPages.length },
            )}
            href="#next"
            aria-disabled={currentPage === numberOfPages.length}
            onClick={() => {
              if (currentPage !== numberOfPages.length) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice(first - 1, last).map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
